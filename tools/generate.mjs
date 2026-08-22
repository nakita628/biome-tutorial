/**
 * Biome 公式ドキュメント (= `biome explain <rule>` の出力) から
 * valid / invalid の fixture と、ルール単位で 1 つだけルールを有効化する
 * biome.json を生成する。
 *
 * 生成物のレイアウト:
 *   packages/<lang>-<valid|invalid>/src/<group>/<rule>/<variant>/01.ts        単独の例
 *   packages/<lang>-<valid|invalid>/src/<group>/<rule>/<variant>/case-01/...  複数ファイルの例
 *
 *   <variant> は default か options-N (ドキュメント中の `json,options` ブロックに対応)
 */
import fs from 'node:fs'
import path from 'node:path'
import {
  CAPABILITY_DOMAINS,
  COMMENT_STYLE,
  EXTRA_CASES,
  LANGS,
  LOCAL_MANIFESTS,
  MANUAL_CASES,
  PKG_DEPENDENCIES,
  PKG_PREFIX,
  packageDir,
  SKIP,
  SUPPRESSIONS,
} from './config.mjs'
import { loadRule } from './parse-explain.mjs'
import { ensureCache, loadRules } from './rules.mjs'

/** ファイル先頭に biome-ignore-all を差し込む */
function withSuppressions(pkgName, rel, lang, code) {
  const categories = SUPPRESSIONS[`${pkgName}/${rel}`]
  if (!categories) return code
  const style = COMMENT_STYLE[lang] ?? 'line'
  const header = categories
    .map((category) => {
      const body = `biome-ignore-all ${category}: 検証対象のルールとは無関係な診断のため`
      if (style === 'block') return `/* ${body} */`
      if (style === 'hash') return `# ${body}`
      if (style === 'html') return `<!-- ${body} -->`
      return `// ${body}`
    })
    .join('\n')
  return `${header}\n\n${code}`
}

const ROOT = path.resolve(import.meta.dirname, '..')
const { version: biomeVersion, groups: rules } = loadRules()
ensureCache(rules, biomeVersion)

/** key = `${pkg}:${kind}` */
const packages = new Map()
const pkgOf = (pkg, kind) => {
  const key = `${pkg}:${kind}`
  if (!packages.has(key)) {
    packages.set(key, { pkg, kind, files: new Map(), overrides: new Map() })
  }
  return packages.get(key)
}

/**
 * project / types ドメインのルール一覧。
 * ルート設定で `domains: all` にしないとプロジェクトスキャナや型推論が動かないが、
 * そのままだと全 fixture にこれらのルールが混入してしまう。
 * そこで各パッケージで明示的に "off" にし、overrides でだけ有効化する。
 * (明示的な "off" は domain の "all" より優先される)
 */
const capabilityRules = []

const stats = { rules: 0, cases: 0, files: 0, unsupported: new Map() }
/** @type {object[]} */
const ruleIndex = []

/**
 * 連続する `file=` 付きブロックを 1 つのシナリオにまとめる。
 * 見出し (Invalid / Valid) が変わったとき、オプションが変わったとき、
 * 同じファイル名が再登場したときにシナリオを区切る。
 */
function groupBlocks(blocks) {
  /** @type {{blocks:object[], multi:boolean}[]} */
  const groups = []
  let scenario = null
  for (const block of blocks) {
    if (block.file == null) {
      scenario = null
      groups.push({ blocks: [block], multi: false })
      continue
    }
    // 見出しが変わるか、同じファイル名が再登場したら別のシナリオとみなす。
    // (オプションの有無はシナリオ内で混在しうるので区切りには使わない)
    const sameContext =
      scenario && scenario.blocks[0].heading === block.heading && !scenario.blocks.some((b) => b.file === block.file)
    if (!sameContext) {
      scenario = { blocks: [], multi: true }
      groups.push(scenario)
    }
    scenario.blocks.push(block)
  }
  return groups
}

for (const [group, names] of Object.entries(rules)) {
  for (const name of names) {
    if (SKIP[name]) continue
    const meta = loadRule(name)
    stats.rules++
    if (meta.domains.some((d) => CAPABILITY_DOMAINS.includes(d))) capabilityRules.push({ group, name })

    const entry = {
      rule: name,
      category: meta.category,
      kind: meta.kind,
      group,
      fix: meta.fix,
      severity: meta.severity,
      since: meta.since,
      recommended: meta.recommended,
      domains: meta.domains,
      description: meta.description,
      cases: [],
    }
    ruleIndex.push(entry)

    /** @type {Map<string, number>} variant ごとの連番 */
    const counters = new Map()

    for (const g of groupBlocks(meta.blocks)) {
      const blocks = g.blocks.filter((b) => LANGS[b.lang])
      for (const b of g.blocks) {
        if (LANGS[b.lang]) continue
        const key = b.lang || '(empty)'
        stats.unsupported.set(key, (stats.unsupported.get(key) ?? 0) + 1)
      }
      if (blocks.length === 0) continue

      // 診断を期待するブロックが 1 つでもあれば invalid。
      // 複数ファイルの例だけは、属性が無い場合に見出し (Invalid / Valid) も判断材料にする。
      const hasExpectation = blocks.some((b) => b.expect !== 'none')
      const kind = hasExpectation || (g.multi && blocks[0].heading === 'Invalid') ? 'invalid' : 'valid'

      // シナリオ内で 1 つでも use_options があれば、そのオプションをディレクトリ全体に適用する
      const optionsIndex = blocks.find((b) => b.optionsIndex != null)?.optionsIndex ?? null
      const variant = optionsIndex == null ? 'default' : `options-${optionsIndex + 1}`
      const target = pkgOf(LANGS[blocks[0].lang].pkg, kind)
      const pkgLabel = `${PKG_PREFIX[LANGS[blocks[0].lang].pkg]}${kind}`
      const baseDir = `src/${group}/${name}/${variant}`

      let caseDir = baseDir
      const files = []
      if (g.multi) {
        const ck = `${baseDir}:case`
        const n = (counters.get(ck) ?? 0) + 1
        counters.set(ck, n)
        caseDir = `${baseDir}/case-${String(n).padStart(2, '0')}`
        for (const b of blocks) {
          const rel = `${caseDir}/${b.file}`
          target.files.set(rel, withSuppressions(pkgLabel, rel, b.lang, b.code))
          files.push(rel)
        }
      } else {
        const b = blocks[0]
        const ext = LANGS[b.lang].ext
        const ck = `${baseDir}:${ext}`
        const n = (counters.get(ck) ?? 0) + 1
        counters.set(ck, n)
        const rel = `${baseDir}/${String(n).padStart(2, '0')}.${ext}`
        target.files.set(rel, withSuppressions(pkgLabel, rel, b.lang, b.code))
        files.push(rel)
      }

      const localManifest = LOCAL_MANIFESTS[`${pkgLabel}/${caseDir}`]
      if (localManifest) {
        target.files.set(`${caseDir}/package.json`, `${JSON.stringify(localManifest, null, 2)}\n`)
      }

      const options = optionsIndex == null ? null : meta.optionsSets[optionsIndex]
      if (!target.overrides.has(baseDir)) {
        target.overrides.set(baseDir, {
          config: buildOverride({ group, name, meta, options, dir: baseDir }),
          info: {
            group,
            rule: name,
            category: meta.category,
            kind: meta.kind,
            description: meta.description,
            severity: meta.severity,
            recommended: meta.recommended,
            fix: meta.fix,
            domains: meta.domains,
            options,
            dir: baseDir,
            cases: 0,
            files: 0,
          },
        })
      }
      const info = target.overrides.get(baseDir).info
      info.cases++
      info.files += files.length

      stats.cases++
      stats.files += files.length
      entry.cases.push({
        package: pkgLabel,
        dir: caseDir,
        expect: kind,
        multiFile: g.multi,
        files,
      })
    }
  }
}

// ドキュメントにコード例が無いルールは手書きのケースで補う
for (const manual of [...MANUAL_CASES, ...EXTRA_CASES]) {
  const entry = ruleIndex.find((r) => r.rule === manual.rule)
  if (!entry) throw new Error(`未知のルールです: ${manual.rule}`)
  const baseDir = `src/${manual.group}/${manual.rule}/${manual.variant}`
  /** @type {Map<string, number>} */
  const counters = new Map()

  for (const c of manual.cases) {
    const target = pkgOf(manual.pkg, c.expect)
    const pkgLabel = `${PKG_PREFIX[manual.pkg]}${c.expect}`
    const n = (counters.get(`${baseDir}:${c.expect}`) ?? 0) + 1
    counters.set(`${baseDir}:${c.expect}`, n)
    const caseDir = `${baseDir}/case-${String(n).padStart(2, '0')}`

    const files = []
    for (const [rel, code] of Object.entries(c.files)) {
      const full = `${caseDir}/${rel}`
      target.files.set(full, code)
      files.push(full)
    }
    if (!target.overrides.has(baseDir)) {
      target.overrides.set(baseDir, {
        config: buildOverride({
          group: manual.group,
          name: manual.rule,
          meta: { kind: entry.kind },
          options: manual.options ?? null,
          dir: baseDir,
        }),
        info: {
          group: manual.group,
          rule: manual.rule,
          category: entry.category,
          kind: entry.kind,
          description: entry.description,
          severity: entry.severity,
          recommended: entry.recommended,
          fix: entry.fix,
          domains: entry.domains,
          options: manual.options ?? null,
          dir: baseDir,
          manual: true,
          cases: 0,
          files: 0,
        },
      })
    }
    const info = target.overrides.get(baseDir).info
    info.cases++
    info.files += files.length
    stats.cases++
    stats.files += files.length
    entry.cases.push({
      package: pkgLabel,
      dir: caseDir,
      expect: c.expect,
      multiFile: files.length > 1,
      files,
      manual: true,
    })
  }
}

/** 1 行で書いたときの JSON (読みやすいように空白を入れる) */
function inlineJson(value) {
  if (value === null || typeof value !== 'object') return JSON.stringify(value)
  if (Array.isArray(value)) {
    return value.length === 0 ? '[]' : `[${value.map(inlineJson).join(', ')}]`
  }
  const entries = Object.entries(value)
  if (entries.length === 0) return '{}'
  return `{ ${entries.map(([key, item]) => `${JSON.stringify(key)}: ${inlineJson(item)}`).join(', ')} }`
}

/**
 * 収まるなら 1 行、収まらなければ展開する JSON シリアライザ。
 * 生成した biome.jsonc を人が読める密度にするために使う。
 */
function stringifyCompact(value, depth = 0, maxWidth = 100) {
  const pad = '  '.repeat(depth)
  const padInner = '  '.repeat(depth + 1)
  const inline = inlineJson(value)

  if (value === null || typeof value !== 'object') return inline
  if (pad.length + inline.length <= maxWidth) return inline

  if (Array.isArray(value)) {
    const items = value.map((item) => `${padInner}${stringifyCompact(item, depth + 1, maxWidth)}`)
    return `[\n${items.join(',\n')}\n${pad}]`
  }

  const items = Object.entries(value).map(
    ([key, item]) => `${padInner}${JSON.stringify(key)}: ${stringifyCompact(item, depth + 1, maxWidth)}`,
  )
  return `{\n${items.join(',\n')}\n${pad}}`
}

/** ルール名 -> biomejs.dev のドキュメント URL */
function docsUrl(info) {
  const slug = info.rule.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
  return info.kind === 'assist'
    ? `https://biomejs.dev/assist/actions/${slug}/`
    : `https://biomejs.dev/linter/rules/${slug}/`
}

/** 指定した段数だけインデントする */
const indent = (text, depth) =>
  text
    .split('\n')
    .map((line) => (line.length > 0 ? `${' '.repeat(depth)}${line}` : line))
    .join('\n')

/**
 * override 1 件ぶんの説明コメント。
 * 「どのルールを・どこで・どの強さで有効にしているか」が読んで分かるようにする。
 */
function renderOverrideComment(info) {
  const lines = [`${info.rule} — ${info.description || '(説明なし)'}`]

  const attributes = [
    info.kind === 'assist' ? 'assist アクション' : `既定の重大度 ${info.severity ?? '不明'}`,
    info.recommended ? 'recommended' : 'recommended ではない',
    info.fix ? `自動修正 ${info.fix}` : '自動修正なし',
  ]
  if (info.domains.length > 0) attributes.push(`ドメイン ${info.domains.join(' / ')}`)

  lines.push(`  縛る対象 : ${info.dir}/ 配下 (${info.cases} ケース / ${info.files} ファイル)`)
  lines.push(`  有効化   : ${info.category} を ${info.kind === 'assist' ? '"on"' : '"error"'} にする`)
  lines.push(`  ルール情報: ${attributes.join(' ・ ')}`)
  if (info.options) {
    lines.push(`  オプション: 既定ではなく下の "options" の設定で検証する`)
  }
  if (info.manual) {
    lines.push('  補足     : 公式ドキュメントにコード例が無いため tools/config.mjs で手書きしたケース')
  }
  lines.push(`  ドキュメント: ${docsUrl(info)}`)

  return lines.map((line) => `// ${line}`).join('\n')
}

/** パッケージの biome.jsonc を組み立てる */
function renderPackageConfig({ pkgName, kind, overrides }) {
  const entries = [...overrides.values()].sort((a, b) =>
    `${a.info.group}/${a.info.rule}/${a.info.dir}`.localeCompare(`${b.info.group}/${b.info.rule}/${b.info.dir}`),
  )
  const totalCases = entries.reduce((sum, e) => sum + e.info.cases, 0)
  const totalFiles = entries.reduce((sum, e) => sum + e.info.files, 0)
  const ruleNames = new Set(entries.map((e) => e.info.rule))

  /** グループごとの件数 (見出しに出す) */
  const perGroup = new Map()
  for (const e of entries) perGroup.set(e.info.group, (perGroup.get(e.info.group) ?? 0) + 1)

  const expectation =
    kind === 'valid'
      ? 'biome check がかならず成功する (診断が 1 件も出ない)'
      : 'biome check がかならず失敗する (しかも有効にしたルールの診断しか出ない)'

  const header = `/**
 * ${pkgName} の Biome 設定
 * tools/generate.mjs が生成しています。直接編集しないでください。
 *
 * ■ このパッケージが保証すること
 *     ${expectation}
 *
 * ■ 何を有効にしているか
 *     - 既定ではルールを 1 つも有効にしない      … linter.rules.preset: "none"
 *     - ディレクトリごとに 1 ルールだけ有効にする … overrides[]
 *     - 有効化しているルール: ${ruleNames.size} 種類 / override: ${entries.length} 件
 *     - 検証しているケース  : ${totalCases} 件 (${totalFiles} ファイル)
 *
 * ■ 何を縛っているか
 *     overrides[].includes に書いたディレクトリだけが、そのルールの検査対象になります。
 *     1 ディレクトリ = 1 ルールなので、${
   kind === 'valid'
     ? '「そのルールから見て問題のないコード」だけを集められます。'
     : '「そのルールの診断が出た」ことと「他のルールの診断が出ていない」ことを同時に検証できます。'
}
 *
 * ■ 内訳 (グループごとの override 件数)
${[...perGroup]
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(([group, count]) => ` *     ${group.padEnd(12)} ${String(count).padStart(3)} 件`)
  .join('\n')}
 */`

  const capabilityRules = capabilityRulesOff()
  const capabilityGroups = Object.entries(capabilityRules).filter(([key]) => key !== 'preset')
  const rulesBody = [
    '// 既定ではどのルールも有効にしない。ここから下の overrides で 1 つずつ有効化する。',
    '"preset": "none",',
    '',
    '// ここから下は「打ち消し」の設定です。',
    '// ルートの biome.jsonc で linter.domains の project / types を "all" にしているのは、',
    '// プロジェクトスキャナと型推論という *機能* を立ち上げるためです',
    '// (overrides でルールを有効にしただけでは、これらの機能は動きません)。',
    '// ただしそのままだと該当ドメインのルールが全 fixture に混入してしまうため、',
    '// ここで明示的に "off" にして黙らせています。',
    '// 明示的な "off" は domains の "all" より優先され、さらに overrides の "error" が最優先です。',
    ...capabilityGroups.map(([group, rules]) => {
      const body = Object.keys(rules)
        .map((rule) => `  "${rule}": "off"`)
        .join(',\n')
      return `"${group}": {\n${body}\n},`
    }),
  ].join('\n')

  const overridesBody = []
  let currentGroup = null
  for (const entry of entries) {
    if (entry.info.group !== currentGroup) {
      currentGroup = entry.info.group
      const bar = '═'.repeat(74)
      const title = `${currentGroup} — override ${perGroup.get(currentGroup)} 件`
      overridesBody.push(`// ${bar}\n// ${title}\n// ${bar}`)
    }
    overridesBody.push(renderOverrideComment(entry.info))
    overridesBody.push(`${stringifyCompact(entry.config)},`)
    overridesBody.push('')
  }
  // 最後の要素の末尾カンマを外す (JSONC でも許されるが、素の JSON として読める形にしておく)
  const rendered = overridesBody.join('\n').replace(/,\n*$/, '\n')

  return `${header}
{
  "$schema": "../../node_modules/@biomejs/biome/configuration_schema.json",

  // このファイルはプロジェクトのルートではなく、ルートの biome.jsonc を継承する。
  "root": false,
  "extends": "//",

  "linter": {
    "rules": {
${indent(rulesBody, 6)}
    }
  },

  // ここから下が「どのディレクトリでどのルールを有効にするか」の一覧です。
  "overrides": [
${indent(rendered, 4)}
  ]
}
`
}

/** ルール 1 つだけを有効化する override を作る */
function buildOverride({ group, name, meta, options, dir }) {
  const includes = [`**/${dir}/**`]
  if (meta.kind === 'assist') {
    return {
      includes,
      assist: {
        enabled: true,
        actions: { source: { [name]: options ? { level: 'on', options } : 'on' } },
      },
    }
  }
  return {
    includes,
    linter: {
      enabled: true,
      rules: { [group]: { [name]: options ? { level: 'error', options } : 'error' } },
    },
  }
}

/** すべてのルールを無効化しつつ、capability 系ルールも明示的に off にした rules 設定 */
function capabilityRulesOff() {
  /** @type {Record<string, unknown>} */
  const rules = { preset: 'none' }
  for (const { group, name } of capabilityRules.sort((a, b) => a.name.localeCompare(b.name))) {
    rules[group] = { ...(rules[group] ?? {}), [name]: 'off' }
  }
  return rules
}

// 生成物は毎回作り直す
for (const pkg of Object.keys(PKG_PREFIX)) {
  for (const kind of ['valid', 'invalid']) {
    fs.rmSync(path.join(ROOT, packageDir(pkg, kind)), { recursive: true, force: true })
  }
}

const manifest = []
for (const { pkg, kind, files, overrides } of packages.values()) {
  const dir = packageDir(pkg, kind)
  const abs = path.join(ROOT, dir)
  for (const [rel, code] of files) {
    const file = path.join(abs, rel)
    fs.mkdirSync(path.dirname(file), { recursive: true })
    fs.writeFileSync(file, code)
  }

  const pkgName = `@biome-tutorial/${PKG_PREFIX[pkg]}${kind}`
  fs.writeFileSync(
    path.join(abs, 'package.json'),
    `${JSON.stringify(
      {
        name: pkgName,
        version: '0.0.0',
        private: true,
        type: 'module',
        ...(PKG_DEPENDENCIES[pkg] ? { dependencies: PKG_DEPENDENCIES[pkg] } : {}),
      },
      null,
      2,
    )}\n`,
  )
  fs.writeFileSync(path.join(abs, 'biome.jsonc'), renderPackageConfig({ pkgName, kind, overrides }))

  manifest.push({ package: pkgName, dir, files: files.size, rules: overrides.size })
}

manifest.sort((a, b) => a.dir.localeCompare(b.dir))
ruleIndex.sort((a, b) => a.rule.localeCompare(b.rule))
fs.writeFileSync(
  path.join(ROOT, 'tools/manifest.json'),
  `${JSON.stringify({ biome: biomeVersion, packages: manifest, rules: ruleIndex }, null, 2)}\n`,
)

console.table(manifest)
console.log('rules:', stats.rules, '/ cases:', stats.cases, '/ files:', stats.files)
console.log('unsupported langs:', Object.fromEntries(stats.unsupported))
