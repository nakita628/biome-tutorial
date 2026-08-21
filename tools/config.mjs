/** コードフェンスの言語 -> 配置先パッケージと拡張子 */
export const LANGS = {
  js: { pkg: 'js', ext: 'js' },
  cjs: { pkg: 'js', ext: 'cjs' },
  ts: { pkg: 'js', ext: 'ts' },
  jsx: { pkg: 'react', ext: 'jsx' },
  tsx: { pkg: 'react', ext: 'tsx' },
  css: { pkg: 'css', ext: 'css' },
  json: { pkg: 'json', ext: 'json' },
  jsonc: { pkg: 'json', ext: 'jsonc' },
  graphql: { pkg: 'graphql', ext: 'graphql' },
  vue: { pkg: 'vue', ext: 'vue' },
  svelte: { pkg: 'svelte', ext: 'svelte' },
  astro: { pkg: 'astro', ext: 'astro' },
  html: { pkg: 'html', ext: 'html' },
}

/** パッケージ種別 -> ディレクトリ名の接頭辞 (js だけ接頭辞なし) */
export const PKG_PREFIX = {
  js: '',
  react: 'react-',
  css: 'css-',
  json: 'json-',
  graphql: 'graphql-',
  vue: 'vue-',
  svelte: 'svelte-',
  astro: 'astro-',
  html: 'html-',
}

export const packageDir = (pkg, kind) => `packages/${PKG_PREFIX[pkg]}${kind}`

/**
 * 「機能」を伴うドメイン。ルート設定で all にしてスキャナ / 型推論を有効化し、
 * 各パッケージで none に戻してルールの混入を防ぐ。
 * (react や vue などのドメインは domains 指定なしでもルール単体で有効化できる)
 */
export const CAPABILITY_DOMAINS = ['project', 'types']

/** 生成対象から完全に除外するルール (今のところなし) */
export const SKIP = {}

/**
 * 各パッケージの package.json に入れる依存。
 * Biome はマニフェストを見てフレームワークを検出するため、
 * バージョンに依存するルール (例: noReactForwardRef は react >= 19) の検証に必要。
 */
export const PKG_DEPENDENCIES = {
  react: { react: '^19.2.0', 'react-dom': '^19.2.0' },
  vue: { vue: '^3.5.0' },
  svelte: { svelte: '^5.0.0' },
  astro: { astro: '^5.0.0' },
}

/**
 * fixture ディレクトリに個別に置く package.json。
 * ルールによって要求される依存バージョンが違う場合に、
 * パッケージ全体の package.json を上書きする形で使う。
 * キーは `<パッケージ名>/<パッケージ内のディレクトリ>`。
 */
export const LOCAL_MANIFESTS = {
  'react-invalid/src/nursery/noReactStringRefs/default': {
    name: 'no-react-string-refs-fixture',
    private: true,
    dependencies: { react: '^16.14.0' },
  },
}

/**
 * 常時有効な syntax ルールがドキュメントの例と衝突するケース。
 * 検証したいルールとは無関係なので、ファイル先頭に biome-ignore-all を差し込む。
 * キーは `<パッケージ名>/<パッケージ内の相対パス>`。
 */
export const SUPPRESSIONS = {
  'invalid/src/correctness/noInvalidConstructorSuper/default/01.js': ['syntax/correctness/noSuperWithoutExtends'],
  'css-invalid/src/correctness/noMissingVarFunction/default/03.css': ['syntax/correctness/noInvalidPropertySyntax'],
  'css-valid/src/correctness/noMissingVarFunction/default/09.css': ['syntax/correctness/noInvalidPropertySyntax'],
}

/** 言語ごとのコメント記法 (suppression コメントの生成に使う) */
export const COMMENT_STYLE = {
  js: 'line',
  cjs: 'line',
  ts: 'line',
  jsx: 'line',
  tsx: 'line',
  css: 'block',
  graphql: 'hash',
  json: 'line',
  jsonc: 'line',
  vue: 'html',
  svelte: 'html',
  astro: 'html',
  html: 'html',
}

/**
 * 期待どおりにならないことが分かっている fixture。
 * キーは `<パッケージ名>/<パッケージ内の相対パス>`、値は理由。
 * Biome のバグではなく「公式ドキュメントの例が単体ファイルとして成立しない」ケースを記録する。
 */
export const EXPECTED_FAILURES = {}

/**
 * 公式ドキュメントにコード例が無い (すべて `ignore` 扱いの) ルール向けに手書きしたケース。
 * これを足すことで、Biome の全ルールが valid / invalid 両方で検証される。
 *
 *   pkg     … LANGS の pkg 名 (配置先パッケージ)
 *   variant … default か options-N
 *   ownConfig … ケース内の biome.json が自分でルールを有効化するため override を作らない
 */
export const MANUAL_CASES = [
  {
    rule: 'noRestrictedTypes',
    group: 'style',
    pkg: 'js',
    variant: 'options-1',
    options: {
      types: {
        Foo: { message: 'Only bar is allowed', use: 'bar' },
        OldAPI: 'Use NewAPI instead',
      },
    },
    cases: [
      {
        expect: 'invalid',
        files: {
          '01.ts':
            'interface Foo {\n  value: number\n}\n\nexport function handle(input: Foo): void {\n  console.log(input.value)\n}\n',
        },
      },
      {
        expect: 'invalid',
        files: {
          '02.ts': 'type OldAPI = { url: string }\n\nexport declare const client: OldAPI\n',
        },
      },
      {
        expect: 'valid',
        files: {
          '01.ts':
            'interface Bar {\n  value: number\n}\n\nexport function handle(input: Bar): void {\n  console.log(input.value)\n}\n',
        },
      },
    ],
  },
  {
    rule: 'noUndeclaredClasses',
    group: 'nursery',
    pkg: 'react',
    variant: 'default',
    cases: [
      {
        expect: 'invalid',
        files: {
          'styles.css': '.header {\n  color: red;\n}\n',
          'App.jsx': 'import "./styles.css"\n\nexport default () => <div className="missing" />\n',
        },
      },
      {
        expect: 'valid',
        files: {
          'styles.css': '.header {\n  color: red;\n}\n',
          'App.jsx': 'import "./styles.css"\n\nexport default () => <div className="header" />\n',
        },
      },
    ],
  },
  {
    rule: 'noQuickfixBiome',
    group: 'suspicious',
    pkg: 'json',
    variant: 'default',
    cases: [
      {
        expect: 'invalid',
        files: {
          '.vscode/settings.json': '{\n  "editor.codeActionsOnSave": {\n    "quickfix.biome": "explicit"\n  }\n}\n',
        },
      },
      {
        expect: 'valid',
        files: {
          '.vscode/settings.json':
            '{\n  "editor.codeActionsOnSave": {\n    "source.fixAll.biome": "explicit"\n  }\n}\n',
        },
      },
    ],
  },
  {
    rule: 'useBiomeIgnoreFolder',
    group: 'suspicious',
    pkg: 'json',
    variant: 'default',
    ownConfig: true,
    cases: [
      {
        expect: 'invalid',
        files: {
          'biome.json': `${JSON.stringify(
            {
              $schema: '../../../../../../../node_modules/@biomejs/biome/configuration_schema.json',
              root: false,
              extends: '//',
              linter: { rules: { preset: 'none', suspicious: { useBiomeIgnoreFolder: 'error' } } },
              files: { includes: ['**', '!dist/**'] },
            },
            null,
            2,
          )}\n`,
        },
      },
      {
        expect: 'valid',
        files: {
          'biome.json': `${JSON.stringify(
            {
              $schema: '../../../../../../../node_modules/@biomejs/biome/configuration_schema.json',
              root: false,
              extends: '//',
              linter: { rules: { preset: 'none', suspicious: { useBiomeIgnoreFolder: 'error' } } },
              files: { includes: ['**', '!dist'] },
            },
            null,
            2,
          )}\n`,
        },
      },
    ],
  },
]

/**
 * リポジトリの中に置けないケース。
 * 検証時に一時ディレクトリへ展開し、そこを作業ディレクトリにして biome を実行する。
 *
 *   - noBiomeFirstException … ルート設定ファイルにしか適用されないため、
 *     リポジトリ内に置くと「ネストしたルート設定」エラーになる
 *   - noUntrustedLicenses   … node_modules の中の package.json を読む必要がある
 */
export const STANDALONE_CASES = [
  {
    rule: 'noBiomeFirstException',
    category: 'lint/suspicious/noBiomeFirstException',
    expect: 'invalid',
    files: {
      'biome.json': `${JSON.stringify(
        {
          linter: { rules: { preset: 'none', suspicious: { noBiomeFirstException: 'error' } } },
          formatter: { enabled: false },
          assist: { enabled: false },
          files: { includes: ['!dist', '**'] },
        },
        null,
        2,
      )}\n`,
      'package.json': '{\n  "name": "no-biome-first-exception-invalid"\n}\n',
    },
  },
  {
    rule: 'noBiomeFirstException',
    category: 'lint/suspicious/noBiomeFirstException',
    expect: 'valid',
    files: {
      'biome.json': `${JSON.stringify(
        {
          linter: { rules: { preset: 'none', suspicious: { noBiomeFirstException: 'error' } } },
          formatter: { enabled: false },
          assist: { enabled: false },
          files: { includes: ['**', '!dist'] },
        },
        null,
        2,
      )}\n`,
      'package.json': '{\n  "name": "no-biome-first-exception-valid"\n}\n',
    },
  },
  {
    rule: 'noUntrustedLicenses',
    category: 'lint/nursery/noUntrustedLicenses',
    expect: 'invalid',
    files: {
      'biome.json': `${JSON.stringify(
        {
          linter: {
            domains: { project: 'all' },
            rules: { preset: 'none', nursery: { noUntrustedLicenses: 'error' } },
          },
          formatter: { enabled: false },
          assist: { enabled: false },
        },
        null,
        2,
      )}\n`,
      'package.json':
        '{\n  "name": "no-untrusted-licenses-invalid",\n  "dependencies": {\n    "untrusted-pkg": "^1.0.0"\n  }\n}\n',
      'index.js': 'import pkg from "untrusted-pkg"\n\nexport default pkg\n',
      'node_modules/untrusted-pkg/package.json':
        '{\n  "name": "untrusted-pkg",\n  "version": "1.0.0",\n  "license": "my-custom-license",\n  "main": "index.js"\n}\n',
      'node_modules/untrusted-pkg/index.js': 'export default {}\n',
    },
  },
  {
    rule: 'noUntrustedLicenses',
    category: 'lint/nursery/noUntrustedLicenses',
    expect: 'valid',
    files: {
      'biome.json': `${JSON.stringify(
        {
          linter: {
            domains: { project: 'all' },
            rules: { preset: 'none', nursery: { noUntrustedLicenses: 'error' } },
          },
          formatter: { enabled: false },
          assist: { enabled: false },
        },
        null,
        2,
      )}\n`,
      'package.json':
        '{\n  "name": "no-untrusted-licenses-valid",\n  "dependencies": {\n    "trusted-pkg": "^1.0.0"\n  }\n}\n',
      'index.js': 'import pkg from "trusted-pkg"\n\nexport default pkg\n',
      'node_modules/trusted-pkg/package.json':
        '{\n  "name": "trusted-pkg",\n  "version": "1.0.0",\n  "license": "MIT",\n  "main": "index.js"\n}\n',
      'node_modules/trusted-pkg/index.js': 'export default {}\n',
    },
  },
]

/**
 * ドキュメントの例だけでは valid / invalid の片方しか埋まらないルールを補う手書きケース。
 * MANUAL_CASES と同じ形式。
 */
export const EXTRA_CASES = [
  // --- ドキュメントに invalid 例が無い (ファイル名や設定ファイルが必要な) ルール ---
  {
    rule: 'noDuplicateDependencies',
    group: 'suspicious',
    pkg: 'json',
    variant: 'default',
    cases: [
      {
        expect: 'invalid',
        files: {
          'package.json':
            '{\n  "name": "duplicate-dependency",\n  "dependencies": { "foo": "1.0.0" },\n  "devDependencies": { "foo": "2.0.0" }\n}\n',
        },
      },
      {
        expect: 'valid',
        files: {
          'package.json':
            '{\n  "name": "single-dependency",\n  "dependencies": { "foo": "1.0.0" },\n  "devDependencies": { "bar": "2.0.0" }\n}\n',
        },
      },
    ],
  },
  {
    rule: 'useRequiredScripts',
    group: 'suspicious',
    pkg: 'json',
    variant: 'options-1',
    options: { requiredScripts: ['build'] },
    cases: [
      {
        expect: 'invalid',
        files: {
          'package.json': '{\n  "name": "missing-build-script",\n  "scripts": { "test": "vitest" }\n}\n',
        },
      },
      {
        expect: 'valid',
        files: {
          'package.json': '{\n  "name": "has-build-script",\n  "scripts": { "build": "tsc", "test": "vitest" }\n}\n',
        },
      },
    ],
  },
  {
    rule: 'noDocumentImportInPage',
    group: 'suspicious',
    pkg: 'react',
    variant: 'default',
    cases: [
      {
        expect: 'invalid',
        files: {
          'package.json': '{\n  "name": "next-page-fixture",\n  "dependencies": { "next": "^15.0.0" }\n}\n',
          'pages/index.jsx':
            'import { Html } from "next/document"\n\nexport default function Page() {\n  return <Html lang="en" />\n}\n',
        },
      },
      {
        expect: 'valid',
        files: {
          'package.json': '{\n  "name": "next-document-fixture",\n  "dependencies": { "next": "^15.0.0" }\n}\n',
          'pages/_document.jsx':
            'import { Html } from "next/document"\n\nexport default function Document() {\n  return <Html lang="en" />\n}\n',
        },
      },
    ],
  },
  {
    rule: 'noHeadImportInDocument',
    group: 'suspicious',
    pkg: 'react',
    variant: 'default',
    cases: [
      {
        expect: 'invalid',
        files: {
          'package.json': '{\n  "name": "next-head-fixture",\n  "dependencies": { "next": "^15.0.0" }\n}\n',
          'pages/_document.jsx':
            'import Head from "next/head"\n\nexport default function Document() {\n  return <Head />\n}\n',
        },
      },
      {
        expect: 'valid',
        files: {
          'package.json': '{\n  "name": "next-head-valid-fixture",\n  "dependencies": { "next": "^15.0.0" }\n}\n',
          'pages/_document.jsx':
            'import { Head } from "next/document"\n\nexport default function Document() {\n  return <Head />\n}\n',
        },
      },
    ],
  },
  {
    rule: 'noUndeclaredEnvVars',
    group: 'suspicious',
    pkg: 'js',
    variant: 'default',
    cases: [
      {
        expect: 'invalid',
        files: {
          'turbo.json': '{\n  "$schema": "https://turbo.build/schema.json",\n  "tasks": { "build": {} }\n}\n',
          'index.js': 'export const value = process.env.MY_UNDECLARED_VAR\n',
        },
      },
      {
        expect: 'valid',
        files: {
          'turbo.json':
            '{\n  "$schema": "https://turbo.build/schema.json",\n  "globalEnv": ["MY_DECLARED_VAR"],\n  "tasks": { "build": {} }\n}\n',
          'index.js': 'export const value = process.env.MY_DECLARED_VAR\n',
        },
      },
    ],
  },
  {
    rule: 'noVueDataObjectDeclaration',
    group: 'correctness',
    pkg: 'vue',
    variant: 'default',
    cases: [
      {
        expect: 'invalid',
        files: {
          'component.vue': '<script>\nexport default {\n  data: { foo: null },\n}\n</script>\n',
        },
      },
      {
        expect: 'valid',
        files: {
          'component.vue': '<script>\nexport default {\n  data() {\n    return { foo: null }\n  },\n}\n</script>\n',
        },
      },
    ],
  },
  {
    rule: 'useFilenamingConvention',
    group: 'style',
    pkg: 'js',
    variant: 'default',
    cases: [
      { expect: 'invalid', files: { 'MyComponent.js': 'export const value = 1\n' } },
      { expect: 'valid', files: { 'my-component.js': 'export const value = 1\n' } },
    ],
  },
  {
    rule: 'useImportExtensions',
    group: 'correctness',
    pkg: 'js',
    variant: 'default',
    cases: [
      {
        expect: 'invalid',
        files: {
          'foo.js': 'export const foo = 1\n',
          'index.js': 'import { foo } from "./foo"\n\nexport default foo\n',
        },
      },
      {
        expect: 'valid',
        files: {
          'foo.js': 'export const foo = 1\n',
          'index.js': 'import { foo } from "./foo.js"\n\nexport default foo\n',
        },
      },
    ],
  },

  // --- ドキュメントに valid 例が無いルール ---
  {
    rule: 'noAccessKey',
    group: 'a11y',
    pkg: 'react',
    variant: 'default',
    cases: [{ expect: 'valid', files: { 'App.jsx': 'export default () => <button type="button">Save</button>\n' } }],
  },
  {
    rule: 'noBeforeInteractiveScriptOutsideDocument',
    group: 'correctness',
    pkg: 'react',
    variant: 'default',
    cases: [
      {
        expect: 'valid',
        files: {
          'package.json': '{\n  "name": "next-script-fixture",\n  "dependencies": { "next": "^15.0.0" }\n}\n',
          'pages/_document.jsx':
            'import Script from "next/script"\n\nexport default function Document() {\n  return <Script src="/script.js" strategy="beforeInteractive" />\n}\n',
        },
      },
    ],
  },
  {
    rule: 'noChildrenProp',
    group: 'correctness',
    pkg: 'react',
    variant: 'default',
    cases: [{ expect: 'valid', files: { 'App.jsx': 'export default () => <div>child</div>\n' } }],
  },
  {
    rule: 'noConsole',
    group: 'suspicious',
    pkg: 'js',
    variant: 'default',
    cases: [
      {
        expect: 'valid',
        files: { '01.js': 'import { logger } from "./logger.js"\n\nlogger.info("hello")\n' },
      },
    ],
  },
  {
    rule: 'noDangerouslySetInnerHtml',
    group: 'security',
    pkg: 'react',
    variant: 'default',
    cases: [{ expect: 'valid', files: { 'App.jsx': 'export default ({ content }) => <div>{content}</div>\n' } }],
  },
  {
    rule: 'noDangerouslySetInnerHtmlWithChildren',
    group: 'security',
    pkg: 'react',
    variant: 'default',
    cases: [
      {
        expect: 'valid',
        files: {
          'App.jsx': 'export default () => <div dangerouslySetInnerHTML={{ __html: "<p>hi</p>" }} />\n',
        },
      },
    ],
  },
  {
    rule: 'noDuplicateClasses',
    group: 'source',
    pkg: 'react',
    variant: 'default',
    cases: [{ expect: 'valid', files: { 'App.jsx': 'export default () => <div className="card shadow" />\n' } }],
  },
  {
    rule: 'noExcessiveCognitiveComplexity',
    group: 'complexity',
    pkg: 'js',
    variant: 'default',
    cases: [
      {
        expect: 'valid',
        files: { '01.js': 'export function sum(a, b) {\n  return a + b\n}\n' },
      },
    ],
  },
  {
    rule: 'noImportantStyles',
    group: 'complexity',
    pkg: 'css',
    variant: 'default',
    cases: [{ expect: 'valid', files: { '01.css': 'a {\n  color: red;\n}\n' } }],
  },
  {
    rule: 'noImportAssign',
    group: 'suspicious',
    pkg: 'js',
    variant: 'default',
    cases: [
      {
        expect: 'valid',
        files: { '01.js': 'import { value } from "./mod.js"\n\nexport const doubled = value * 2\n' },
      },
    ],
  },
  {
    rule: 'noSelfCompare',
    group: 'suspicious',
    pkg: 'js',
    variant: 'default',
    cases: [{ expect: 'valid', files: { '01.js': 'export const isSame = (a, b) => a === b\n' } }],
  },
  {
    rule: 'noShadowRestrictedNames',
    group: 'suspicious',
    pkg: 'js',
    variant: 'default',
    cases: [{ expect: 'valid', files: { '01.js': 'export function toText(value) {\n  return String(value)\n}\n' } }],
  },
  {
    rule: 'noUnreachable',
    group: 'correctness',
    pkg: 'js',
    variant: 'default',
    cases: [
      {
        expect: 'valid',
        files: { '01.js': 'export function pick(flag) {\n  if (flag) {\n    return 1\n  }\n  return 2\n}\n' },
      },
    ],
  },
  {
    rule: 'noVoid',
    group: 'complexity',
    pkg: 'js',
    variant: 'default',
    cases: [{ expect: 'valid', files: { '01.js': 'export const nothing = undefined\n' } }],
  },
  {
    rule: 'noVoidElementsWithChildren',
    group: 'correctness',
    pkg: 'react',
    variant: 'default',
    cases: [{ expect: 'valid', files: { 'App.jsx': 'export default () => <img src="/a.png" alt="a" />\n' } }],
  },
  {
    rule: 'noWith',
    group: 'suspicious',
    pkg: 'js',
    variant: 'default',
    cases: [
      {
        expect: 'valid',
        files: { '01.js': 'export function area({ radius }) {\n  return Math.PI * radius * radius\n}\n' },
      },
    ],
  },
  {
    rule: 'organizeImports',
    group: 'source',
    pkg: 'js',
    variant: 'default',
    cases: [
      {
        expect: 'valid',
        files: {
          '01.js': 'import { a } from "./a.js"\nimport { b } from "./b.js"\n\nexport const value = a + b\n',
        },
      },
    ],
  },
  {
    rule: 'useBlockStatements',
    group: 'style',
    pkg: 'js',
    variant: 'default',
    cases: [
      {
        expect: 'valid',
        files: { '01.js': 'export function run(flag, task) {\n  if (flag) {\n    task()\n  }\n}\n' },
      },
    ],
  },
  {
    rule: 'useFragmentSyntax',
    group: 'style',
    pkg: 'react',
    variant: 'default',
    cases: [
      {
        expect: 'valid',
        files: { 'App.jsx': 'export default () => (\n  <>\n    <span>a</span>\n    <span>b</span>\n  </>\n)\n' },
      },
    ],
  },
  {
    rule: 'useShorthandAssign',
    group: 'style',
    pkg: 'js',
    variant: 'default',
    cases: [
      {
        expect: 'valid',
        files: { '01.js': 'export function inc(counter) {\n  let value = counter\n  value += 1\n  return value\n}\n' },
      },
    ],
  },
  {
    rule: 'useSortedAttributes',
    group: 'source',
    pkg: 'react',
    variant: 'default',
    cases: [
      { expect: 'valid', files: { 'App.jsx': 'export default () => <input disabled name="a" type="text" />\n' } },
    ],
  },
  {
    rule: 'useSortedTypeFields',
    group: 'source',
    pkg: 'graphql',
    variant: 'default',
    cases: [
      { expect: 'valid', files: { '01.graphql': 'type User {\n  email: String\n  id: ID!\n  name: String\n}\n' } },
    ],
  },
  {
    rule: 'useValidAriaProps',
    group: 'a11y',
    pkg: 'react',
    variant: 'default',
    cases: [
      { expect: 'valid', files: { 'App.jsx': 'export default () => <div aria-label="Close" role="button" />\n' } },
    ],
  },
]

/**
 * 自動修正 (`biome check --write --unsafe`) を当てても診断が残るルール。
 * 「修正が部分的である」ことは Biome の設計どおりの挙動なので、ここに記録して許容する。
 * tools/verify-fixes.mjs は、ここに無いルールが出てきたときだけ失敗する。
 */
export const PARTIAL_FIXES = {
  noBannedTypes: '修正は部分的で、3 件のケースで診断が残る (fix: safe)',
  noFloatingPromises: '修正は部分的で、1 件のケースで診断が残る (fix: unsafe)',
  noMisleadingCharacterClass: '修正は部分的で、5 件のケースで診断が残る (fix: safe)',
  noMisusedPromises: '修正は部分的で、1 件のケースで診断が残る (fix: unsafe)',
  noNonNullAssertion: '修正は部分的で、1 件のケースで診断が残る (fix: unsafe)',
  noPrototypeBuiltins: '修正は部分的で、2 件のケースで診断が残る (fix: safe)',
  noRestrictedTypes: '修正は部分的で、1 件のケースで診断が残る (fix: safe)',
  noSvelteUnnecessaryStateWrap: '修正は部分的で、1 件のケースで診断が残る (fix: unsafe)',
  noUnusedFunctionParameters: '修正は部分的で、1 件のケースで診断が残る (fix: unsafe)',
  noUnusedVariables: '修正は部分的で、2 件のケースで診断が残る (fix: unsafe)',
  noUselessCatch: '修正は部分的で、1 件のケースで診断が残る (fix: unsafe)',
  noUselessFragments: '修正は部分的で、2 件のケースで診断が残る (fix: unsafe)',
  noUselessLoneBlockStatements: '修正は部分的で、1 件のケースで診断が残る (fix: safe)',
  useAnchorContent: '修正は部分的で、4 件のケースで診断が残る (fix: unsafe)',
  useArraySome: '修正は部分的で、3 件のケースで診断が残る (fix: unsafe)',
  useCollapsedElseIf: '修正は部分的で、1 件のケースで診断が残る (fix: safe)',
  useCollapsedIf: '修正は部分的で、1 件のケースで診断が残る (fix: safe)',
  useConst: '修正は部分的で、1 件のケースで診断が残る (fix: safe)',
  useExhaustiveDependencies: '修正は部分的で、3 件のケースで診断が残る (fix: unsafe)',
  useGoogleFontPreconnect: '修正は部分的で、1 件のケースで診断が残る (fix: safe)',
  useIsNan: '修正は部分的で、1 件のケースで診断が残る (fix: unsafe)',
  useNamingConvention: '修正は部分的で、3 件のケースで診断が残る (fix: safe)',
  useNullishCoalescing: '修正は部分的で、6 件のケースで診断が残る (fix: safe)',
  useParseIntRadix: '修正は部分的で、3 件のケースで診断が残る (fix: unsafe)',
  useUnicodeRegex: '修正は部分的で、1 件のケースで診断が残る (fix: safe)',
  useValidTypeof: '修正は部分的で、5 件のケースで診断が残る (fix: unsafe)',
  useVueValidTemplateRoot: '修正は部分的で、2 件のケースで診断が残る (fix: unsafe)',
}

/**
 * `biome check --write --unsafe` が停止しない (無限ループする) ことが分かっている fixture。
 * tools/verify-fixes.mjs では一時コピー側の設定で除外する。
 *
 * 再現手順 (Biome 2.5.9):
 *   biome check a.vue --write --unsafe   # a.vue は `<style>.foo { color: red; }</style>` のみ
 *   nursery/useScopedStyles を有効にしていると終了しない。
 *   `--write` なし、または安全な修正のみの `--write` では正常に終了する。
 */
export const KNOWN_FIX_HANGS = ['**/useScopedStyles/**']
