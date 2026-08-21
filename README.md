# biome-tutorial

[Biome](https://biomejs.dev/ja/) の**すべてのルールを 1 つずつ検証する**リポジトリです。

Biome 自身のドキュメント (`biome explain <ルール名>` の出力 = biomejs.dev のルールページと同じ内容) から
valid / invalid のコード例を機械的に取り出し、fixture として配置しています。

- `packages/*-valid` … `biome check` が**必ず成功する**パッケージ
- `packages/*-invalid` … `biome check` が**必ず失敗する**パッケージ

GitHub Actions では「valid はすべて成功」「invalid はすべて失敗」の両方を確認しています。

## 現在のカバレッジ

| | |
| --- | --- |
| Biome | `2.5.9` |
| ルール数 | 532 (lint 522 + assist 10) |
| 検証ケース数 | 2790 (valid 1263 / invalid 1527) + 単独プロジェクト 4 |
| valid / invalid が両方揃っているルール | 532 / 532 |

ルールごとの一覧は [`docs/rules.md`](./docs/rules.md) にあります。

## パッケージ構成

| パッケージ | 対象 |
| --- | --- |
| `packages/valid` / `packages/invalid` | JavaScript / TypeScript (`.js` `.cjs` `.ts`) |
| `packages/react-valid` / `packages/react-invalid` | JSX / TSX |
| `packages/css-valid` / `packages/css-invalid` | CSS |
| `packages/json-valid` / `packages/json-invalid` | JSON / JSONC |
| `packages/graphql-valid` / `packages/graphql-invalid` | GraphQL |
| `packages/vue-valid` / `packages/vue-invalid` | Vue SFC |
| `packages/svelte-valid` / `packages/svelte-invalid` | Svelte |
| `packages/astro-valid` / `packages/astro-invalid` | Astro |
| `packages/html-valid` / `packages/html-invalid` | HTML |

各パッケージの中身は次のように並んでいます。

```
packages/invalid/
  biome.jsonc                                 ルールごとの overrides
  src/<グループ>/<ルール名>/default/01.js       単独ファイルの例
  src/<グループ>/<ルール名>/options-1/01.js     ルールオプション付きの例
  src/<グループ>/<ルール名>/default/case-01/    複数ファイルが必要な例
```

## 仕組み

### 1 ディレクトリ = 1 ルール

`packages/*/biome.jsonc` はルールごとに `overrides` を持ち、そのディレクトリでは**対象のルールだけ**が有効になります。

```jsonc
{
  "root": false,
  "extends": "//",
  "linter": { "rules": { "preset": "none", /* ... */ } },
  "overrides": [
    {
      "includes": ["**/src/suspicious/noDebugger/default/**"],
      "linter": { "enabled": true, "rules": { "suspicious": { "noDebugger": "error" } } }
    }
  ]
}
```

設定ファイルはコメントを書きたいので `.jsonc` にしています (`biome.json` はコメント不可)。
生成される `packages/*/biome.jsonc` には override ごとに次のような説明が入ります。

```jsonc
// noImportantStyles — Disallow the use of the `!important` style.
//   縛る対象 : src/complexity/noImportantStyles/default/ 配下 (1 ケース / 1 ファイル)
//   有効化   : lint/complexity/noImportantStyles を "error" にする
//   ルール情報: 既定の重大度 warn ・ recommended ・ 自動修正 unsafe
//   ドキュメント: https://biomejs.dev/linter/rules/no-important-styles/
{
  "includes": ["**/src/complexity/noImportantStyles/default/**"],
  "linter": { "enabled": true, "rules": { "complexity": { "noImportantStyles": "error" } } }
}
```

ファイル先頭には、そのパッケージが何を保証するか・何ルール有効にしているか・
グループごとの内訳もまとめてあります。
**どの設定で何を縛れるか**の全体像は
[`docs/biome-config-reference.jsonc`](./docs/biome-config-reference.jsonc) にあります。

こうすることで invalid 側は「そのルールの診断がちょうど出て、他のルールの診断は出ない」ことまで確認できます。

### ルート設定で「機能」だけを有効化する

型推論やプロジェクトスキャナを必要とするルール (`types` / `project` ドメイン) は、
**ルート設定でドメインを有効にしないと動きません**。overrides でルールを有効化しただけでは動きません。

そこでルート `biome.jsonc` では

```jsonc
"linter": { "domains": { "project": "all", "types": "all" }, "rules": { "preset": "none" } }
```

として機能だけを有効にし、各パッケージ側でそれらのルールを明示的に `"off"` に戻しています
(明示的な `"off"` はドメインの `"all"` より優先されます)。
Vue / Svelte / Astro のテンプレート内を検査するには `html.experimentalFullSupportEnabled` も必要です。

### コード例の分類

コードフェンスの属性で valid / invalid を判定しています。これは Biome 自身の doc-test と同じ規約です。

| 属性 | 期待する結果 |
| --- | --- |
| `expect_diagnostic` | 診断が出る → invalid |
| `expect_diff` | コードアクションの差分が出る → invalid |
| `use_options` | 直前の `json,options` ブロックの設定を使う |
| `ignore` | 検証対象外 |
| なし | 診断が出ない → valid |

## 使い方

```bash
pnpm install

pnpm generate          # ドキュメントから fixture と biome.jsonc を再生成する
pnpm check:valid       # valid パッケージが成功することを確認
pnpm check:invalid     # invalid パッケージが失敗することを確認
pnpm verify            # ケースごとに「どのルールの診断が出たか」まで検証
pnpm verify:standalone # 単独プロジェクトが必要なケースを検証
pnpm verify:config     # docs/biome-config-reference.jsonc が実際に通る設定か確認
pnpm test              # 上記をまとめて実行
pnpm verify:fixes      # 自動修正で診断が消えるかを検証 (数分かかるので test には含めていない)
```

`pnpm verify` は `tools/report.json` に、`pnpm verify:fixes` は `tools/fix-report.json` に結果を書き出します。

`packages/` 以下は fixture なので pnpm のワークスペースには含めていません。
fixture の `package.json` は、Biome がフレームワークや依存バージョンを検出するためだけに置いてあります
(例: `noReactForwardRef` は React 19 以上、`noReactStringRefs` の `this.refs` の例は React 18 未満が必要)。

## Biome を新しいバージョンに上げる

```bash
pnpm add -D -w @biomejs/biome@<version>
pnpm generate
pnpm test
```

`pnpm generate` は `biome explain` の出力を `tools/.cache/` にキャッシュし、
Biome のバージョンが変わったら自動で作り直します。
新しいルールが追加されていれば fixture も自動で増えます。

`pnpm test` が落ちた場合は、Biome 側の挙動が変わったか、ドキュメントの例が変わったかのどちらかです。
差分を確認したうえで、必要なら `tools/config.mjs` の `EXPECTED_FAILURES` に理由付きで記録してください。

## tools/

| ファイル | 役割 |
| --- | --- |
| `tools/jsonc.mjs` | コメント付き JSON (`biome.jsonc`) を Node から読むための最小パーサ |
| `tools/rules.mjs` | JSON スキーマからルール一覧を取得し、`biome explain` の出力をキャッシュする |
| `tools/parse-explain.mjs` | `biome explain` の出力をパースする |
| `tools/config.mjs` | 言語とパッケージの対応、手書きケース、既知の例外 |
| `tools/generate.mjs` | fixture と `biome.jsonc` を生成する |
| `tools/verify.mjs` | ケースごとに期待どおりの診断が出るか検証する |
| `tools/verify-standalone.mjs` | 一時ディレクトリが必要なケースを検証する |
| `tools/verify-config-reference.mjs` | 設定リファレンスが実際に通る設定か確認する |
| `tools/verify-fixes.mjs` | 自動修正を当てると診断が消えるかを検証する |
| `tools/check-packages.mjs` | valid が成功し invalid が失敗することを確認する |
| `tools/report.mjs` | `docs/rules.md` を生成する |

`tools/` 自体は `tools/biome.jsonc` で recommended ルールとフォーマッタを有効にしており、
このリポジトリが Biome を「使う側」としても成立するようにしています。

## 設定ファイル

コメントを書けるように、設定はすべて `.jsonc` にしています。

| ファイル | 内容 |
| --- | --- |
| [`biome.jsonc`](./biome.jsonc) | ルート設定。各項目が何を縛るのかをコメントで説明 |
| [`tools/biome.jsonc`](./tools/biome.jsonc) | `tools/` 用。recommended ルールとフォーマッタを有効にしている |
| `packages/*/biome.jsonc` | 生成物。override 1 件ごとに「どのルールを・どこで・どの強さで有効にしているか」をコメント化 |
| [`docs/biome-config-reference.jsonc`](./docs/biome-config-reference.jsonc) | **どの設定で何を縛れるか**の一覧 |

`docs/biome-config-reference.jsonc` は説明用ですが、`pnpm verify:config` が
一時ディレクトリへ `biome.jsonc` として展開して Biome に読ませているので、
キー名や値が Biome の実装から乖離するとコケます。

## GitHub Actions

`.github/workflows/ci.yml` に 7 つのジョブがあり、それぞれ保証したいことが 1 つずつ対応しています。

| ジョブ | 保証すること |
| --- | --- |
| `valid` | `packages/*-valid` で `biome check` が成功する |
| `invalid` | `packages/*-invalid` で `biome check` が失敗する |
| `verify` | ケースごとに「対象ルールの診断だけが出る」ことまで一致する |
| `generated` | コミットされている fixture が生成結果と一致する |
| `config` | 設定リファレンスが実際に通る設定である |
| `fixes` | 自動修正を当てると診断が消える (残るルールは記録済み) |
| `tools` | このリポジトリ自身のコードが recommended に従っている |

## この構成で見つかったこと

- overrides でルールを有効化しただけでは、型推論やプロジェクトスキャナを必要とするルールは動かない。
  ルート設定でドメインを有効にする必要がある。
- Vue / Svelte / Astro のテンプレートは `html.experimentalFullSupportEnabled` を有効にしないと検査されない。
- 自動修正が付いているルールの invalid ケース 656 件のうち 599 件は
  `biome check --write --unsafe` で診断が消える。残り 57 件 (27 ルール) は修正が部分的で、
  `tools/config.mjs` の `PARTIAL_FIXES` に記録している。
- `nursery/useScopedStyles` を有効にした状態で、`<style>` だけの `.vue` に
  `biome check --write --unsafe` を当てると Biome 2.5.9 は終了しない (無限ループする)。
  `--write` なし、または安全な修正のみなら正常に終わる。
  この fixture は `tools/config.mjs` の `KNOWN_FIX_HANGS` で自動修正の検証から除外している。

## 既知の制約

- `noBiomeFirstException` はルート設定ファイルにしか適用されず、`noUntrustedLicenses` は `node_modules` の
  中身を読む必要があるため、リポジトリ内に fixture を置けません。
  この 2 つだけは `tools/verify-standalone.mjs` が一時ディレクトリへ展開して検証します。
- 常時有効な `syntax/*` ルールがドキュメントの例と衝突する箇所には、
  `tools/config.mjs` の `SUPPRESSIONS` に基づいて `biome-ignore-all` を差し込んでいます。
