/**
 * カバレッジ表 (docs/rules.md) を生成する。
 */
import fs from 'node:fs'
import path from 'node:path'
import { STANDALONE_CASES } from './config.mjs'

const ROOT = path.resolve(import.meta.dirname, '..')
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/manifest.json'), 'utf8'))

const standaloneByRule = new Map()
for (const c of STANDALONE_CASES) {
  const list = standaloneByRule.get(c.rule) ?? []
  list.push(c)
  standaloneByRule.set(c.rule, list)
}

const groups = new Map()
for (const rule of manifest.rules) {
  const list = groups.get(rule.group) ?? []
  list.push(rule)
  groups.set(rule.group, list)
}

const lines = []
lines.push('# ルールカバレッジ')
lines.push('')
lines.push(`Biome \`${manifest.biome}\` の全ルールに対する valid / invalid ケースの一覧です。`)
lines.push('`tools/report.mjs` が生成しているので、直接編集しないでください。')
lines.push('')

lines.push('## グループごとの集計')
lines.push('')
lines.push('| グループ | ルール数 | valid ケース | invalid ケース |')
lines.push('| --- | ---: | ---: | ---: |')
let totalRules = 0
let totalValid = 0
let totalInvalid = 0
for (const [group, rules] of [...groups].sort((a, b) => a[0].localeCompare(b[0]))) {
  const cases = rules.flatMap((r) => r.cases).concat(rules.flatMap((r) => standaloneByRule.get(r.rule) ?? []))
  const valid = cases.filter((c) => c.expect === 'valid').length
  const invalid = cases.filter((c) => c.expect === 'invalid').length
  totalRules += rules.length
  totalValid += valid
  totalInvalid += invalid
  lines.push(`| ${group} | ${rules.length} | ${valid} | ${invalid} |`)
}
lines.push(`| **合計** | **${totalRules}** | **${totalValid}** | **${totalInvalid}** |`)
lines.push('')

for (const [group, rules] of [...groups].sort((a, b) => a[0].localeCompare(b[0]))) {
  lines.push(`## ${group}`)
  lines.push('')
  lines.push('| ルール | 既定の重大度 | recommended | ドメイン | valid | invalid | 置き場所 |')
  lines.push('| --- | --- | :-: | --- | ---: | ---: | --- |')
  for (const rule of rules.sort((a, b) => a.rule.localeCompare(b.rule))) {
    const standalone = standaloneByRule.get(rule.rule) ?? []
    const cases = [...rule.cases, ...standalone]
    const valid = cases.filter((c) => c.expect === 'valid').length
    const invalid = cases.filter((c) => c.expect === 'invalid').length
    const packages = [...new Set(rule.cases.map((c) => c.package))].sort()
    const where = standalone.length
      ? '一時ディレクトリ (`tools/verify-standalone.mjs`)'
      : packages.map((p) => `\`packages/${p}\``).join('<br>')
    const url = `https://biomejs.dev/linter/rules/${rule.rule.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)}/`
    lines.push(
      `| [${rule.rule}](${url}) | ${rule.severity ?? '-'} | ${rule.recommended ? '✓' : ''} | ${rule.domains.join(', ') || '-'} | ${valid} | ${invalid} | ${where} |`,
    )
  }
  lines.push('')
}

fs.mkdirSync(path.join(ROOT, 'docs'), { recursive: true })
fs.writeFileSync(path.join(ROOT, 'docs/rules.md'), `${lines.join('\n')}\n`)
console.log(`docs/rules.md を書き出しました (ルール ${totalRules} / valid ${totalValid} / invalid ${totalInvalid})`)
