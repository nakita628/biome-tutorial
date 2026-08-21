/**
 * 「Biome の自動修正を当てると invalid が valid になる」ことを検証する。
 *
 * 一時ディレクトリにルート設定と invalid パッケージを複製し、
 * `biome check --write --unsafe` を当てたあとに診断が消えるかを確認する。
 * リポジトリの中身は書き換えない。
 */

import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { KNOWN_FIX_HANGS, PARTIAL_FIXES } from './config.mjs'
import { parseJsonc } from './jsonc.mjs'

const ROOT = path.resolve(import.meta.dirname, '..')
const BIOME = path.join(ROOT, 'node_modules/.bin/biome')
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/manifest.json'), 'utf8'))

const fixable = new Map(manifest.rules.filter((r) => r.fix).map((r) => [r.rule, r.fix]))
const invalidPackages = manifest.packages.filter((p) => p.dir.endsWith('invalid'))

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'biome-fixes-'))
try {
  // ルート設定を複製 (一時ディレクトリは git 管理外なので vcs は無効化する)
  const rootConfig = parseJsonc(fs.readFileSync(path.join(ROOT, 'biome.jsonc'), 'utf8'))
  rootConfig.vcs = { enabled: false }
  delete rootConfig.$schema
  fs.writeFileSync(path.join(tmp, 'biome.jsonc'), `${JSON.stringify(rootConfig, null, 2)}\n`)
  fs.writeFileSync(path.join(tmp, 'package.json'), '{\n  "name": "biome-fix-check",\n  "private": true\n}\n')

  for (const pkg of invalidPackages) {
    fs.cpSync(path.join(ROOT, pkg.dir), path.join(tmp, pkg.dir), { recursive: true })
    // 自動修正が停止しないことが分かっている fixture はコピー側の設定で除外する
    const configPath = path.join(tmp, pkg.dir, 'biome.jsonc')
    const config = parseJsonc(fs.readFileSync(configPath, 'utf8'))
    config.files = { includes: ['**', ...KNOWN_FIX_HANGS.map((glob) => `!${glob}`)] }
    fs.writeFileSync(configPath, `${JSON.stringify(config, null, 2)}\n`)
  }

  const run = (args) => {
    try {
      return execFileSync(BIOME, args, {
        cwd: tmp,
        encoding: 'utf8',
        maxBuffer: 1024 * 1024 * 512,
        stdio: ['ignore', 'pipe', 'pipe'],
        // 修正が停止しないケースを踏んでも CI が止まらないようにする
        timeout: 5 * 60 * 1000,
      })
    } catch (error) {
      if (error.signal) throw new Error(`biome が時間内に終わりませんでした: ${args.join(' ')}`)
      if (error.stdout != null) return error.stdout
      throw error
    }
  }

  for (const pkg of invalidPackages) {
    // 1 回目の修正で新しい違反が生まれることがあるので 2 回当てる
    run(['check', pkg.dir, '--write', '--unsafe', '--max-diagnostics=none'])
    run(['check', pkg.dir, '--write', '--unsafe', '--max-diagnostics=none'])
  }

  /** @type {Map<string, string[]>} パッケージ内相対パス -> 残った診断 */
  const remaining = new Map()
  for (const pkg of invalidPackages) {
    const report = JSON.parse(run(['check', pkg.dir, '--reporter=json', '--max-diagnostics=none']))
    for (const d of report.diagnostics ?? []) {
      const file = d.location?.path
      if (typeof file !== 'string') continue
      const key = `${path.basename(pkg.dir)}/${path.relative(pkg.dir, path.relative(tmp, path.resolve(tmp, file)))}`
      if (!remaining.has(key)) remaining.set(key, [])
      remaining.get(key).push(d.category)
    }
  }

  const failures = []
  let checked = 0

  for (const rule of manifest.rules) {
    if (!fixable.has(rule.rule)) continue
    for (const c of rule.cases) {
      if (c.expect !== 'invalid') continue
      checked++
      const left = c.files.flatMap((f) => remaining.get(`${c.package}/${f}`) ?? [])
      if (left.length === 0) continue
      failures.push({
        rule: rule.rule,
        fix: rule.fix,
        id: `${c.package}/${c.dir}`,
        categories: [...new Set(left)],
      })
    }
  }

  const byRule = new Map()
  for (const f of failures) {
    const list = byRule.get(f.rule) ?? []
    list.push(f)
    byRule.set(f.rule, list)
  }

  const unexpected = [...byRule.keys()].filter((rule) => !(rule in PARTIAL_FIXES)).sort((a, b) => a.localeCompare(b))
  const stale = Object.keys(PARTIAL_FIXES)
    .filter((rule) => !byRule.has(rule))
    .sort((a, b) => a.localeCompare(b))

  fs.writeFileSync(
    path.join(ROOT, 'tools/fix-report.json'),
    `${JSON.stringify({ biome: manifest.biome, checkedCases: checked, failures }, null, 2)}\n`,
  )

  console.log(`修正可能なルールの invalid ケース: ${checked}`)
  console.log(`修正後も診断が残ったケース: ${failures.length} (${byRule.size} ルール)`)
  console.log(`部分的な修正として記録済みのルール: ${byRule.size - unexpected.length}`)

  if (stale.length) {
    console.log('\n完全に修正できるようになったルール (PARTIAL_FIXES から削除してください):')
    for (const rule of stale) console.log(`  - ${rule}`)
  }
  if (unexpected.length) {
    console.log('\n修正しきれないのに未記録のルール:')
    for (const rule of unexpected) {
      const list = byRule.get(rule)
      console.log(`  ✗ ${rule} (fix: ${fixable.get(rule)}) — ${list.length} 件`)
      for (const f of list.slice(0, 3)) console.log(`      ${f.id}`)
    }
  }
  if (unexpected.length || stale.length) process.exitCode = 1
  else console.log('\n自動修正の結果は記録どおりです。')
} finally {
  fs.rmSync(tmp, { recursive: true, force: true })
}
