/**
 * リポジトリの中に置けないケースを検証する。
 *
 * ルート設定ファイル自体を対象にするルールや node_modules を読むルールは、
 * リポジトリ内に fixture を置くと「ネストしたルート設定」になってしまうため、
 * 一時ディレクトリへ展開してからそこを作業ディレクトリにして biome を実行する。
 */

import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { STANDALONE_CASES } from './config.mjs'

const ROOT = path.resolve(import.meta.dirname, '..')
const BIOME = path.join(ROOT, 'node_modules/.bin/biome')

const failures = []

for (const [index, c] of STANDALONE_CASES.entries()) {
  const label = `${c.rule} (${c.expect})`
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), `biome-standalone-${index}-`))
  try {
    for (const [rel, code] of Object.entries(c.files)) {
      const file = path.join(dir, rel)
      fs.mkdirSync(path.dirname(file), { recursive: true })
      fs.writeFileSync(file, code)
    }

    let stdout
    try {
      stdout = execFileSync(BIOME, ['check', '.', '--reporter=json', '--max-diagnostics=none'], {
        cwd: dir,
        encoding: 'utf8',
        maxBuffer: 1024 * 1024 * 64,
        stdio: ['ignore', 'pipe', 'pipe'],
      })
    } catch (error) {
      stdout = error.stdout ?? ''
      if (!stdout.trim()) throw new Error(`biome の実行に失敗しました (${label})\n${error.stderr}`)
    }

    const found = (JSON.parse(stdout).diagnostics ?? []).map((d) => d.category)
    const mine = found.filter((category) => category === c.category)
    const others = found.filter((category) => category !== c.category)

    let reason = null
    if (c.expect === 'valid') {
      if (found.length) reason = `診断が ${found.length} 件出ています (${[...new Set(found)].join(', ')})`
    } else if (mine.length === 0) {
      reason = others.length
        ? `${c.category} が出ず、代わりに ${[...new Set(others)].join(', ')} が出ています`
        : `${c.category} の診断が出ていません`
    } else if (others.length) {
      reason = `想定外の診断が混ざっています (${[...new Set(others)].join(', ')})`
    }

    if (reason) failures.push({ label, reason })
    console.log(`${reason ? '✗' : '✓'} ${label}${reason ? ` — ${reason}` : ''}`)
  } finally {
    fs.rmSync(dir, { recursive: true, force: true })
  }
}

console.log(`\n単独プロジェクトのケース: ${STANDALONE_CASES.length} / 失敗: ${failures.length}`)
if (failures.length) process.exitCode = 1
