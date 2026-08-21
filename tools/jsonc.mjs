/**
 * JSONC (コメント付き JSON) を読むための最小限のパーサ。
 * biome.jsonc を Node 側から読むために使う。
 */

/** @param {string} text */
export function parseJsonc(text) {
  let out = ''
  let inString = false
  let escaped = false
  let comment = null // 'line' | 'block'

  for (let i = 0; i < text.length; i++) {
    const char = text[i]
    const next = text[i + 1]

    if (comment === 'line') {
      if (char === '\n') {
        comment = null
        out += char
      }
      continue
    }
    if (comment === 'block') {
      if (char === '*' && next === '/') {
        comment = null
        i++
      }
      continue
    }
    if (inString) {
      out += char
      if (escaped) escaped = false
      else if (char === '\\') escaped = true
      else if (char === '"') inString = false
      continue
    }
    if (char === '"') {
      inString = true
      out += char
      continue
    }
    if (char === '/' && next === '/') {
      comment = 'line'
      i++
      continue
    }
    if (char === '/' && next === '*') {
      comment = 'block'
      i++
      continue
    }
    out += char
  }

  // 末尾カンマを落とす
  return JSON.parse(out.replace(/,(\s*[}\]])/g, '$1'))
}
