/**
 * Biome の JSON スキーマからルール一覧を取り出し、
 * `biome explain <rule>` の出力を tools/.cache へキャッシュする。
 */

import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const BIOME = path.join(ROOT, 'node_modules/.bin/biome')
const SCHEMA = path.join(ROOT, 'node_modules/@biomejs/biome/configuration_schema.json')
export const CACHE_DIR = path.join(ROOT, 'tools/.cache')

/** lint のルールグループ (スキーマ上の定義名) */
const LINT_GROUPS = {
  A11y: 'a11y',
  Complexity: 'complexity',
  Correctness: 'correctness',
  Nursery: 'nursery',
  Performance: 'performance',
  Security: 'security',
  Style: 'style',
  Suspicious: 'suspicious',
}

const isRuleName = (name) => /^(no|use|organize)[A-Z]/.test(name)

/** @returns {{version: string, groups: Record<string, string[]>}} */
export function loadRules() {
  const schema = JSON.parse(fs.readFileSync(SCHEMA, 'utf8'))
  const defs = schema.$defs ?? schema.definitions
  /** @type {Record<string, string[]>} */
  const groups = {}
  for (const [definition, group] of Object.entries(LINT_GROUPS)) {
    groups[group] = Object.keys(defs[definition].properties).filter(isRuleName).sort()
  }
  // assist アクション (assist/source/*) も同じ枠組みで扱う
  groups.source = Object.keys(defs.Source.properties).filter(isRuleName).sort()

  const version = JSON.parse(
    fs.readFileSync(path.join(ROOT, 'node_modules/@biomejs/biome/package.json'), 'utf8'),
  ).version
  return { version, groups }
}

/** `biome explain` の出力をキャッシュする (Biome のバージョンが変わったら作り直す) */
export function ensureCache(groups, version) {
  const stamp = path.join(CACHE_DIR, '.biome-version')
  if (fs.existsSync(stamp) && fs.readFileSync(stamp, 'utf8').trim() !== version) {
    fs.rmSync(CACHE_DIR, { recursive: true, force: true })
  }
  fs.mkdirSync(CACHE_DIR, { recursive: true })

  const all = Object.values(groups).flat()
  let generated = 0
  for (const rule of all) {
    const file = path.join(CACHE_DIR, `${rule}.txt`)
    if (fs.existsSync(file)) continue
    fs.writeFileSync(file, execFileSync(BIOME, ['explain', rule], { encoding: 'utf8', maxBuffer: 1024 * 1024 * 64 }))
    generated++
  }
  fs.writeFileSync(stamp, `${version}\n`)
  if (generated > 0) console.log(`biome explain の出力を ${generated} 件キャッシュしました`)
}
