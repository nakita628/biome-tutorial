/**
 * docs/biome-config-reference.jsonc が「実際に通る設定」であることを確認する。
 *
 * 一時ディレクトリへ biome.jsonc として展開し、Biome が設定エラーを出さないかを見る。
 * これによりリファレンスのキー名や値が Biome の実装から乖離しないようにする。
 */
import { execFileSync } from 'node:child_process'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const BIOME = path.join(ROOT, 'node_modules/.bin/biome')
const REFERENCE = path.join(ROOT, 'docs/biome-config-reference.jsonc')

const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'biome-config-reference-'))
try {
  const source = fs.readFileSync(REFERENCE, 'utf8')
  // $schema の相対パスは一時ディレクトリでは解決できないので実体をコピーして差し替える
  fs.copyFileSync(
    path.join(ROOT, 'node_modules/@biomejs/biome/configuration_schema.json'),
    path.join(dir, 'schema.json'),
  )
  fs.writeFileSync(
    path.join(dir, 'biome.jsonc'),
    source.replace('"../node_modules/@biomejs/biome/configuration_schema.json"', '"./schema.json"'),
  )
  fs.writeFileSync(path.join(dir, 'package.json'), '{\n  "name": "biome-config-reference"\n}\n')
  fs.writeFileSync(path.join(dir, '.gitignore'), '')
  // リファレンスは vcs.useIgnoreFile を有効にしているので、Git リポジトリとして初期化しておく
  execFileSync('git', ['init', '--quiet', dir], { stdio: 'ignore' })
  fs.writeFileSync(path.join(dir, 'sample.ts'), 'export const value = 1\n')

  let stdout = ''
  let stderr = ''
  let status = 0
  try {
    stdout = execFileSync(BIOME, ['check', 'sample.ts'], {
      cwd: dir,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    })
  } catch (error) {
    stdout = error.stdout ?? ''
    stderr = error.stderr ?? ''
    status = error.status ?? 1
  }

  const output = `${stdout}\n${stderr}`
  const rejected = /configuration|Found an unknown key|deserialize/.test(output)
  if (status !== 0 || rejected) {
    console.log('✗ docs/biome-config-reference.jsonc を Biome が受け付けませんでした\n')
    console.log(output.trim())
    process.exitCode = 1
  } else {
    console.log('✓ docs/biome-config-reference.jsonc は Biome が受け付ける設定です')
  }
} finally {
  fs.rmSync(dir, { recursive: true, force: true })
}
