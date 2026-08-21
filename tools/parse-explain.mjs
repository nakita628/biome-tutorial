import fs from 'node:fs'
import path from 'node:path'

/**
 * `biome explain <rule>` の出力をパースする。
 *
 * Biome のドキュメント内コードフェンスは、Biome 自身の doc-test と同じ規約を持つ:
 *   - `expect_diagnostic` … 診断がちょうど 1 件出ることを期待する (= invalid)
 *   - `expect_diff`       … コードアクションによる差分が出ることを期待する (= invalid)
 *   - `ignore`            … 検証対象外
 *   - `use_options`       … 直前の `json,options` ブロックの設定を使う
 *   - 上記なし            … 診断が出ないことを期待する (= valid)
 *
 * セクション見出し (Invalid / Valid) は Options セクション内で再登場するため
 * 分類には使わず、必ず属性で判定する。
 */

const FENCE = '```'

/** @param {string} text */
export function parseExplain(text) {
  const lines = text.split('\n')

  /** @type {string[]} */
  const summary = []
  /** @type {string[]} */
  const domains = []
  /** @type {string[]} */
  const description = []
  /** @type {{lang:string,attrs:Set<string>,file:string|null,code:string}[]} */
  const rawBlocks = []

  let section = null
  let heading = null
  let fence = null

  for (const raw of lines) {
    const line = raw.startsWith(' ') ? raw.slice(1) : raw

    if (line.startsWith(FENCE)) {
      if (fence) {
        fence.code = `${fence.body.join('\n').replace(/\s+$/, '')}\n`
        delete fence.body
        rawBlocks.push(fence)
        fence = null
      } else {
        const parts = line
          .slice(FENCE.length)
          .trim()
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean)
        const [lang, ...attrs] = parts
        const fileAttr = attrs.find((a) => a.startsWith('file='))
        fence = {
          heading,
          lang: lang ?? '',
          attrs: new Set(attrs.filter((a) => !a.startsWith('file='))),
          file: fileAttr ? fileAttr.slice('file='.length) : null,
          body: [],
        }
      }
      continue
    }
    if (fence) {
      fence.body.push(line)
      continue
    }

    // 見出しは行頭カラム 0。ただし Summary/Domains の箇条書き `- ...` は見出しではない
    if (raw && !raw.startsWith(' ') && !raw.startsWith('- ')) {
      heading = raw
      section = raw === 'Summary' || raw === 'Domains' || raw === 'Description' ? raw : 'other'
      continue
    }
    if (section === 'Summary') summary.push(raw)
    if (section === 'Domains' && raw.trim().startsWith('- Name:')) {
      domains.push(raw.split('Name:')[1].trim())
    }
    if (section === 'Description') description.push(raw.trim())
  }

  const summaryText = summary.join('\n')
  const pick = (re) => summaryText.match(re)?.[1]?.trim() ?? null
  const category = pick(/- Diagnostic category: (.+)/)

  /** ルールオプションのバリエーション (JSON 文字列で一意化) */
  /** @type {{key:string, value:unknown}[]} */
  const optionsSets = []
  let current = null

  /** @type {{lang:string,attrs:Set<string>,file:string|null,code:string,expect:'diagnostic'|'diff'|'none',optionsIndex:number|null}[]} */
  const blocks = []

  for (const b of rawBlocks) {
    if (b.attrs.has('options') || b.attrs.has('full_options')) {
      let parsed = null
      try {
        parsed = JSON.parse(b.code)
      } catch {
        // JSON として壊れている options ブロックは無視する
      }
      const value = parsed && typeof parsed === 'object' && 'options' in parsed ? parsed.options : parsed
      if (value != null) {
        const key = JSON.stringify(value)
        let index = optionsSets.findIndex((o) => o.key === key)
        if (index === -1) index = optionsSets.push({ key, value }) - 1
        current = index
      }
      continue
    }
    if (b.attrs.has('ignore')) continue

    const expect = b.attrs.has('expect_diagnostic') ? 'diagnostic' : b.attrs.has('expect_diff') ? 'diff' : 'none'

    // ドキュメント本文に貼られた「設定サンプル」の JSON は fixture ではない
    if (expect === 'none' && (b.lang === 'json' || b.lang === 'jsonc')) {
      try {
        const parsed = JSON.parse(b.code)
        const keys = Object.keys(parsed ?? {})
        if (keys.length === 1 && (keys[0] === 'options' || keys[0] === category?.split('/').pop())) continue
      } catch {
        // JSON でないなら fixture として扱う
      }
    }

    blocks.push({
      heading: b.heading,
      lang: b.lang,
      attrs: b.attrs,
      file: b.file,
      code: b.code,
      expect,
      optionsIndex: b.attrs.has('use_options') ? current : null,
    })
  }

  return {
    name: pick(/- Name: (.+)/),
    category,
    kind: category?.startsWith('assist/') ? 'assist' : 'lint',
    group: category?.split('/')[1] ?? null,
    fix: pick(/- Fix: (.+)/),
    severity: pick(/- Default severity: (.+)/),
    since: pick(/- Available from version: (.+)/),
    recommended: /- This rule is recommended/.test(summaryText),
    domains,
    // 説明文の 1 行目 (biome.jsonc のコメントに使う)
    description: description.find((line) => line.length > 0) ?? '',
    optionsSets: optionsSets.map((o) => o.value),
    blocks,
  }
}

/** @param {string} rule */
export function loadRule(rule, cacheDir = path.join(import.meta.dirname, '.cache')) {
  return parseExplain(fs.readFileSync(path.join(cacheDir, `${rule}.txt`), 'utf8'))
}
