/**
 * valid パッケージは `biome check` が成功し、
 * invalid パッケージは失敗することを確認する。
 *
 *   node tools/check-packages.mjs valid
 *   node tools/check-packages.mjs invalid
 */

import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const BIOME = path.join(ROOT, 'node_modules/.bin/biome')
const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/manifest.json'), 'utf8'))

const mode = process.argv[2]
if (mode !== 'valid' && mode !== 'invalid') {
  console.error('使い方: node tools/check-packages.mjs <valid|invalid>')
  process.exit(2)
}

const dirs = manifest.packages
  .map((p) => p.dir)
  .filter((dir) => path.basename(dir).endsWith(`-${mode}`) || path.basename(dir) === mode)

let ng = 0
for (const dir of dirs) {
  const result = spawnSync(BIOME, ['check', dir, '--max-diagnostics=none'], { cwd: ROOT, encoding: 'utf8' })
  const shouldPass = mode === 'valid'
  const passed = result.status === 0
  const ok = passed === shouldPass

  if (ok) {
    console.log(`✓ ${dir} … ${shouldPass ? '診断なしで成功' : `想定どおり失敗 (exit ${result.status})`}`)
  } else {
    ng++
    console.log(`✗ ${dir} … ${shouldPass ? '成功するはずが失敗しました' : '失敗するはずが成功しました'}`)
    if (shouldPass) console.log(result.stdout.split('\n').slice(0, 40).join('\n'))
  }
}

console.log(`\n${mode} パッケージ: ${dirs.length} / 期待どおりでないもの: ${ng}`)
if (ng > 0) process.exitCode = 1
