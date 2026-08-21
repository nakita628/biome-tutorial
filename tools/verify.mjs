/**
 * 生成した fixture が期待どおりの結果になるかを検証する。
 *
 *   valid   … そのケースのファイルから診断が 1 件も出ない
 *   invalid … そのケースから対象ルールの診断が 1 件以上出て、他のルールの診断は出ない
 *
 * 使い方:
 *   node tools/verify.mjs               全パッケージ
 *   node tools/verify.mjs valid invalid パッケージ (ディレクトリ名) を指定
 */

import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { EXPECTED_FAILURES, STANDALONE_CASES } from './config.mjs'

const ROOT = path.resolve(import.meta.dirname, '..')
const BIOME = path.join(ROOT, 'node_modules/.bin/biome')
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/manifest.json'), 'utf8'))

const selected = process.argv.slice(2)
const targets = manifest.packages
  .map((p) => p.dir)
  .filter((dir) => selected.length === 0 || selected.includes(path.basename(dir)))

/** パッケージ配下の診断を { パッケージ内相対パス -> 診断[] } で取得する */
function collectDiagnostics(dir) {
  let stdout
  try {
    stdout = execFileSync(BIOME, ['check', dir, '--reporter=json', '--max-diagnostics=none'], {
      cwd: ROOT,
      encoding: 'utf8',
      maxBuffer: 1024 * 1024 * 512,
      stdio: ['ignore', 'pipe', 'pipe'],
    })
  } catch (error) {
    // 診断が出ると exit code は 1 になるが、stdout の JSON は正しく出力される
    stdout = error.stdout ?? ''
    if (!stdout.trim()) throw new Error(`biome の実行に失敗しました (${dir})\n${error.stderr}`)
  }
  const report = JSON.parse(stdout)
  /** @type {Map<string, {category:string,severity:string,message:string}[]>} */
  const byFile = new Map()
  for (const d of report.diagnostics ?? []) {
    const file = d.location?.path
    if (typeof file !== 'string') continue
    const rel = path.relative(dir, path.resolve(ROOT, file))
    if (!byFile.has(rel)) byFile.set(rel, [])
    byFile.get(rel).push({ category: d.category, severity: d.severity, message: d.message })
  }
  return byFile
}

const diagnostics = new Map()
for (const dir of targets) diagnostics.set(path.basename(dir), collectDiagnostics(dir))

/** @type {object[]} */
const failures = []
/** @type {Map<string, {ok:number, ng:number}>} */
const perRule = new Map()
let checked = 0

for (const rule of manifest.rules) {
  for (const c of rule.cases) {
    if (!diagnostics.has(c.package)) continue
    checked++
    const byFile = diagnostics.get(c.package)
    const found = c.files.flatMap((f) => (byFile.get(f) ?? []).map((d) => ({ ...d, file: f })))
    const mine = found.filter((d) => d.category === rule.category)
    const others = found.filter((d) => d.category !== rule.category)

    let reason = null
    if (c.expect === 'valid') {
      if (found.length > 0) {
        reason = `診断が ${found.length} 件出ています (${[...new Set(found.map((d) => d.category))].join(', ')})`
      }
    } else if (mine.length === 0) {
      reason = others.length
        ? `${rule.category} が出ず、代わりに ${[...new Set(others.map((d) => d.category))].join(', ')} が出ています`
        : `${rule.category} の診断が出ていません`
    } else if (others.length > 0) {
      reason = `想定外の診断が混ざっています (${[...new Set(others.map((d) => d.category))].join(', ')})`
    }

    const stat = perRule.get(rule.rule) ?? { ok: 0, ng: 0 }
    stat[reason ? 'ng' : 'ok']++
    perRule.set(rule.rule, stat)

    if (reason) {
      failures.push({
        rule: rule.rule,
        category: rule.category,
        package: c.package,
        dir: c.dir,
        files: c.files,
        expect: c.expect,
        reason,
      })
    }
  }
}

// すべてのルールが valid / invalid の両方でカバーされていることを確認する
// (単独プロジェクトでしか検証できないルールは tools/verify-standalone.mjs 側で数える)
const standalone = new Map()
for (const c of STANDALONE_CASES) {
  const set = standalone.get(c.rule) ?? new Set()
  set.add(c.expect)
  standalone.set(c.rule, set)
}
const uncovered = []
if (selected.length === 0) {
  for (const rule of manifest.rules) {
    const kinds = new Set(rule.cases.map((c) => c.expect))
    for (const kind of standalone.get(rule.rule) ?? []) kinds.add(kind)
    const missing = ['valid', 'invalid'].filter((k) => !kinds.has(k))
    if (missing.length) uncovered.push({ rule: rule.rule, missing })
  }
}

const known = new Set(Object.keys(EXPECTED_FAILURES))
const idOf = (f) => `${f.package}/${f.dir}`
const unexpected = failures.filter((f) => !known.has(idOf(f)))
const expected = failures.filter((f) => known.has(idOf(f)))
const stale = [...known].filter((k) => !failures.some((f) => idOf(f) === k))

const report = {
  biome: manifest.biome,
  checkedCases: checked,
  rules: perRule.size,
  fullyPassingRules: [...perRule.values()].filter((s) => s.ng === 0).length,
  uncoveredRules: uncovered,
  failures: unexpected,
  knownFailures: expected.map((f) => ({ ...f, note: EXPECTED_FAILURES[idOf(f)] })),
  staleKnownFailures: stale,
}
fs.writeFileSync(path.join(ROOT, 'tools/report.json'), `${JSON.stringify(report, null, 2)}\n`)

console.log(`Biome ${manifest.biome}`)
console.log(`検証したケース: ${checked}`)
console.log(`ルール数: ${perRule.size} (全ケースが期待どおり: ${report.fullyPassingRules})`)
console.log(`既知の例外: ${expected.length}`)
if (uncovered.length) {
  console.log(`\nvalid / invalid の両方が揃っていないルール: ${uncovered.length}`)
  for (const u of uncovered) console.log(`  - ${u.rule} (${u.missing.join(', ')} が無い)`)
}
if (stale.length) {
  console.log('\n不要になった既知の例外 (tools/config.mjs の EXPECTED_FAILURES から削除してください):')
  for (const k of stale) console.log(`  - ${k}`)
}
if (unexpected.length) {
  console.log(`\n想定外の不一致: ${unexpected.length}\n`)
  for (const f of unexpected.slice(0, 80)) {
    console.log(`  ✗ ${f.package}/${f.dir}  (${f.rule}, 期待: ${f.expect})`)
    console.log(`      ${f.reason}`)
  }
  if (unexpected.length > 80) console.log(`  ... 他 ${unexpected.length - 80} 件`)
}
if (unexpected.length || stale.length || uncovered.length) process.exitCode = 1
else console.log('\nすべてのケースが期待どおりです。')
