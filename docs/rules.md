# ルールカバレッジ

Biome `2.5.9` の全ルールに対する valid / invalid ケースの一覧です。
`tools/report.mjs` が生成しているので、直接編集しないでください。

## グループごとの集計

| グループ | ルール数 | valid ケース | invalid ケース |
| --- | ---: | ---: | ---: |
| a11y | 38 | 100 | 110 |
| complexity | 50 | 136 | 158 |
| correctness | 99 | 213 | 279 |
| nursery | 95 | 238 | 257 |
| performance | 15 | 30 | 30 |
| security | 6 | 12 | 18 |
| source | 10 | 12 | 30 |
| style | 99 | 274 | 324 |
| suspicious | 120 | 250 | 323 |
| **合計** | **532** | **1265** | **1529** |

## a11y

| ルール | 既定の重大度 | recommended | ドメイン | valid | invalid | 置き場所 |
| --- | --- | :-: | --- | ---: | ---: | --- |
| [noAccessKey](https://biomejs.dev/linter/rules/no-access-key/) | error | ✓ | - | 1 | 3 | `packages/react-invalid`<br>`packages/react-valid` |
| [noAmbiguousAnchorText](https://biomejs.dev/linter/rules/no-ambiguous-anchor-text/) | error | ✓ | - | 1 | 2 | `packages/react-invalid`<br>`packages/react-valid` |
| [noAriaHiddenOnFocusable](https://biomejs.dev/linter/rules/no-aria-hidden-on-focusable/) | error | ✓ | - | 3 | 2 | `packages/react-invalid`<br>`packages/react-valid` |
| [noAriaUnsupportedElements](https://biomejs.dev/linter/rules/no-aria-unsupported-elements/) | error | ✓ | - | 2 | 2 | `packages/react-invalid`<br>`packages/react-valid` |
| [noAutofocus](https://biomejs.dev/linter/rules/no-autofocus/) | error | ✓ | - | 6 | 4 | `packages/react-invalid`<br>`packages/react-valid` |
| [noDistractingElements](https://biomejs.dev/linter/rules/no-distracting-elements/) | error | ✓ | - | 1 | 2 | `packages/react-invalid`<br>`packages/react-valid` |
| [noHeaderScope](https://biomejs.dev/linter/rules/no-header-scope/) | error | ✓ | - | 2 | 2 | `packages/react-invalid`<br>`packages/react-valid` |
| [noInteractiveElementToNoninteractiveRole](https://biomejs.dev/linter/rules/no-interactive-element-to-noninteractive-role/) | error | ✓ | - | 3 | 1 | `packages/react-invalid`<br>`packages/react-valid` |
| [noLabelWithoutControl](https://biomejs.dev/linter/rules/no-label-without-control/) | error | ✓ | - | 1 | 6 | `packages/react-invalid`<br>`packages/react-valid` |
| [noNoninteractiveElementInteractions](https://biomejs.dev/linter/rules/no-noninteractive-element-interactions/) | info |  | - | 6 | 1 | `packages/react-invalid`<br>`packages/react-valid` |
| [noNoninteractiveElementToInteractiveRole](https://biomejs.dev/linter/rules/no-noninteractive-element-to-interactive-role/) | error | ✓ | - | 1 | 1 | `packages/react-invalid`<br>`packages/react-valid` |
| [noNoninteractiveTabindex](https://biomejs.dev/linter/rules/no-noninteractive-tabindex/) | error | ✓ | - | 3 | 3 | `packages/react-invalid`<br>`packages/react-valid` |
| [noPositiveTabindex](https://biomejs.dev/linter/rules/no-positive-tabindex/) | error | ✓ | - | 2 | 3 | `packages/invalid`<br>`packages/react-invalid`<br>`packages/react-valid`<br>`packages/valid` |
| [noRedundantAlt](https://biomejs.dev/linter/rules/no-redundant-alt/) | error | ✓ | - | 1 | 3 | `packages/react-invalid`<br>`packages/react-valid` |
| [noRedundantRoles](https://biomejs.dev/linter/rules/no-redundant-roles/) | error | ✓ | - | 3 | 3 | `packages/react-invalid`<br>`packages/react-valid` |
| [noStaticElementInteractions](https://biomejs.dev/linter/rules/no-static-element-interactions/) | error | ✓ | - | 2 | 3 | `packages/react-invalid`<br>`packages/react-valid` |
| [noSvgWithoutTitle](https://biomejs.dev/linter/rules/no-svg-without-title/) | error | ✓ | - | 8 | 5 | `packages/react-invalid`<br>`packages/react-valid` |
| [useAltText](https://biomejs.dev/linter/rules/use-alt-text/) | error | ✓ | - | 4 | 2 | `packages/react-invalid`<br>`packages/react-valid` |
| [useAnchorContent](https://biomejs.dev/linter/rules/use-anchor-content/) | error | ✓ | - | 5 | 5 | `packages/react-invalid`<br>`packages/react-valid` |
| [useAriaActivedescendantWithTabindex](https://biomejs.dev/linter/rules/use-aria-activedescendant-with-tabindex/) | error | ✓ | - | 2 | 1 | `packages/react-invalid`<br>`packages/react-valid` |
| [useAriaPropsForRole](https://biomejs.dev/linter/rules/use-aria-props-for-role/) | error | ✓ | - | 2 | 2 | `packages/react-invalid`<br>`packages/react-valid` |
| [useAriaPropsSupportedByRole](https://biomejs.dev/linter/rules/use-aria-props-supported-by-role/) | error | ✓ | - | 1 | 2 | `packages/react-invalid`<br>`packages/react-valid` |
| [useButtonType](https://biomejs.dev/linter/rules/use-button-type/) | error | ✓ | - | 1 | 3 | `packages/invalid`<br>`packages/react-invalid`<br>`packages/react-valid` |
| [useFocusableInteractive](https://biomejs.dev/linter/rules/use-focusable-interactive/) | error | ✓ | - | 2 | 2 | `packages/react-invalid`<br>`packages/react-valid` |
| [useGenericFontNames](https://biomejs.dev/linter/rules/use-generic-font-names/) | error | ✓ | - | 5 | 2 | `packages/css-invalid`<br>`packages/css-valid` |
| [useHeadingContent](https://biomejs.dev/linter/rules/use-heading-content/) | error | ✓ | - | 5 | 4 | `packages/react-invalid`<br>`packages/react-valid` |
| [useHtmlLang](https://biomejs.dev/linter/rules/use-html-lang/) | error | ✓ | - | 4 | 5 | `packages/react-invalid`<br>`packages/react-valid` |
| [useIframeTitle](https://biomejs.dev/linter/rules/use-iframe-title/) | error | ✓ | - | 1 | 8 | `packages/react-invalid`<br>`packages/react-valid` |
| [useKeyWithClickEvents](https://biomejs.dev/linter/rules/use-key-with-click-events/) | error | ✓ | - | 5 | 1 | `packages/react-invalid`<br>`packages/react-valid` |
| [useKeyWithMouseEvents](https://biomejs.dev/linter/rules/use-key-with-mouse-events/) | error | ✓ | - | 1 | 2 | `packages/react-invalid`<br>`packages/react-valid` |
| [useMediaCaption](https://biomejs.dev/linter/rules/use-media-caption/) | error | ✓ | - | 2 | 2 | `packages/react-invalid`<br>`packages/react-valid` |
| [useSemanticElements](https://biomejs.dev/linter/rules/use-semantic-elements/) | error | ✓ | - | 3 | 4 | `packages/react-invalid`<br>`packages/react-valid` |
| [useValidAnchor](https://biomejs.dev/linter/rules/use-valid-anchor/) | error | ✓ | - | 4 | 5 | `packages/react-invalid`<br>`packages/react-valid` |
| [useValidAriaProps](https://biomejs.dev/linter/rules/use-valid-aria-props/) | error | ✓ | - | 1 | 2 | `packages/react-invalid`<br>`packages/react-valid` |
| [useValidAriaRole](https://biomejs.dev/linter/rules/use-valid-aria-role/) | error | ✓ | - | 3 | 4 | `packages/react-invalid`<br>`packages/react-valid` |
| [useValidAriaValues](https://biomejs.dev/linter/rules/use-valid-aria-values/) | error | ✓ | - | 1 | 4 | `packages/react-invalid`<br>`packages/react-valid` |
| [useValidAutocomplete](https://biomejs.dev/linter/rules/use-valid-autocomplete/) | error | ✓ | - | 1 | 1 | `packages/react-invalid`<br>`packages/react-valid` |
| [useValidLang](https://biomejs.dev/linter/rules/use-valid-lang/) | error | ✓ | - | 1 | 3 | `packages/react-invalid`<br>`packages/react-valid` |

## complexity

| ルール | 既定の重大度 | recommended | ドメイン | valid | invalid | 置き場所 |
| --- | --- | :-: | --- | ---: | ---: | --- |
| [noAdjacentSpacesInRegex](https://biomejs.dev/linter/rules/no-adjacent-spaces-in-regex/) | warn | ✓ | - | 3 | 4 | `packages/invalid`<br>`packages/valid` |
| [noArguments](https://biomejs.dev/linter/rules/no-arguments/) | warn | ✓ | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noBannedTypes](https://biomejs.dev/linter/rules/no-banned-types/) | warn | ✓ | - | 11 | 6 | `packages/invalid`<br>`packages/valid` |
| [noCommaOperator](https://biomejs.dev/linter/rules/no-comma-operator/) | warn | ✓ | - | 1 | 3 | `packages/invalid`<br>`packages/valid` |
| [noDivRegex](https://biomejs.dev/linter/rules/no-div-regex/) | info |  | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noEmptyTypeParameters](https://biomejs.dev/linter/rules/no-empty-type-parameters/) | warn | ✓ | - | 2 | 2 | `packages/invalid`<br>`packages/valid` |
| [noExcessiveCognitiveComplexity](https://biomejs.dev/linter/rules/no-excessive-cognitive-complexity/) | info |  | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noExcessiveLinesPerFunction](https://biomejs.dev/linter/rules/no-excessive-lines-per-function/) | info |  | - | 4 | 1 | `packages/invalid`<br>`packages/valid` |
| [noExcessiveNestedTestSuites](https://biomejs.dev/linter/rules/no-excessive-nested-test-suites/) | info |  | test | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noExtraBooleanCast](https://biomejs.dev/linter/rules/no-extra-boolean-cast/) | info | ✓ | - | 1 | 5 | `packages/invalid`<br>`packages/valid` |
| [noFlatMapIdentity](https://biomejs.dev/linter/rules/no-flat-map-identity/) | info | ✓ | - | 1 | 2 | `packages/invalid`<br>`packages/valid` |
| [noForEach](https://biomejs.dev/linter/rules/no-for-each/) | warn |  | - | 3 | 2 | `packages/invalid`<br>`packages/valid` |
| [noImplicitCoercions](https://biomejs.dev/linter/rules/no-implicit-coercions/) | info |  | - | 8 | 10 | `packages/invalid`<br>`packages/valid` |
| [noImportantStyles](https://biomejs.dev/linter/rules/no-important-styles/) | warn | ✓ | - | 1 | 1 | `packages/css-invalid`<br>`packages/css-valid` |
| [noRedundantDefaultExport](https://biomejs.dev/linter/rules/no-redundant-default-export/) | warn |  | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noStaticOnlyClass](https://biomejs.dev/linter/rules/no-static-only-class/) | warn | ✓ | - | 4 | 3 | `packages/invalid`<br>`packages/valid` |
| [noThisInStatic](https://biomejs.dev/linter/rules/no-this-in-static/) | warn | ✓ | - | 2 | 2 | `packages/invalid`<br>`packages/valid` |
| [noUselessCatch](https://biomejs.dev/linter/rules/no-useless-catch/) | info | ✓ | - | 3 | 2 | `packages/invalid`<br>`packages/valid` |
| [noUselessCatchBinding](https://biomejs.dev/linter/rules/no-useless-catch-binding/) | info |  | - | 4 | 3 | `packages/invalid`<br>`packages/valid` |
| [noUselessConstructor](https://biomejs.dev/linter/rules/no-useless-constructor/) | info | ✓ | - | 5 | 4 | `packages/invalid`<br>`packages/valid` |
| [noUselessContinue](https://biomejs.dev/linter/rules/no-useless-continue/) | info | ✓ | - | 1 | 6 | `packages/invalid`<br>`packages/valid` |
| [noUselessEmptyExport](https://biomejs.dev/linter/rules/no-useless-empty-export/) | info | ✓ | - | 1 | 2 | `packages/invalid`<br>`packages/valid` |
| [noUselessEscapeInRegex](https://biomejs.dev/linter/rules/no-useless-escape-in-regex/) | info | ✓ | - | 3 | 2 | `packages/invalid`<br>`packages/valid` |
| [noUselessFragments](https://biomejs.dev/linter/rules/no-useless-fragments/) | info | ✓ | - | 4 | 4 | `packages/react-invalid`<br>`packages/react-valid` |
| [noUselessLabel](https://biomejs.dev/linter/rules/no-useless-label/) | info | ✓ | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noUselessLoneBlockStatements](https://biomejs.dev/linter/rules/no-useless-lone-block-statements/) | info | ✓ | - | 1 | 2 | `packages/invalid`<br>`packages/valid` |
| [noUselessRename](https://biomejs.dev/linter/rules/no-useless-rename/) | info | ✓ | - | 4 | 3 | `packages/invalid`<br>`packages/valid` |
| [noUselessReturn](https://biomejs.dev/linter/rules/no-useless-return/) | info |  | - | 3 | 3 | `packages/invalid`<br>`packages/valid` |
| [noUselessStringConcat](https://biomejs.dev/linter/rules/no-useless-string-concat/) | info |  | - | 7 | 4 | `packages/invalid`<br>`packages/valid` |
| [noUselessStringRaw](https://biomejs.dev/linter/rules/no-useless-string-raw/) | info | ✓ | - | 2 | 2 | `packages/invalid`<br>`packages/valid` |
| [noUselessSwitchCase](https://biomejs.dev/linter/rules/no-useless-switch-case/) | info | ✓ | - | 2 | 2 | `packages/invalid`<br>`packages/valid` |
| [noUselessTernary](https://biomejs.dev/linter/rules/no-useless-ternary/) | info | ✓ | - | 2 | 4 | `packages/invalid`<br>`packages/valid` |
| [noUselessThisAlias](https://biomejs.dev/linter/rules/no-useless-this-alias/) | info | ✓ | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noUselessTypeConstraint](https://biomejs.dev/linter/rules/no-useless-type-constraint/) | info | ✓ | - | 1 | 12 | `packages/invalid`<br>`packages/valid` |
| [noUselessUndefined](https://biomejs.dev/linter/rules/no-useless-undefined/) | info |  | - | 2 | 6 | `packages/invalid`<br>`packages/valid` |
| [noUselessUndefinedInitialization](https://biomejs.dev/linter/rules/no-useless-undefined-initialization/) | info | ✓ | - | 4 | 4 | `packages/invalid`<br>`packages/valid` |
| [noVoid](https://biomejs.dev/linter/rules/no-void/) | warn |  | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [useArrayFind](https://biomejs.dev/linter/rules/use-array-find/) | info |  | types | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [useArrowFunction](https://biomejs.dev/linter/rules/use-arrow-function/) | warn | ✓ | - | 4 | 2 | `packages/invalid`<br>`packages/valid` |
| [useDateNow](https://biomejs.dev/linter/rules/use-date-now/) | warn | ✓ | - | 2 | 5 | `packages/invalid`<br>`packages/valid` |
| [useFlatMap](https://biomejs.dev/linter/rules/use-flat-map/) | info | ✓ | - | 1 | 2 | `packages/invalid`<br>`packages/valid` |
| [useIndexOf](https://biomejs.dev/linter/rules/use-index-of/) | info | ✓ | - | 14 | 6 | `packages/invalid`<br>`packages/valid` |
| [useLiteralKeys](https://biomejs.dev/linter/rules/use-literal-keys/) | info | ✓ | - | 1 | 4 | `packages/invalid`<br>`packages/valid` |
| [useMaxParams](https://biomejs.dev/linter/rules/use-max-params/) | warn |  | - | 3 | 3 | `packages/invalid`<br>`packages/valid` |
| [useNumericLiterals](https://biomejs.dev/linter/rules/use-numeric-literals/) | warn | ✓ | - | 1 | 3 | `packages/invalid`<br>`packages/valid` |
| [useOptionalChain](https://biomejs.dev/linter/rules/use-optional-chain/) | warn | ✓ | - | 5 | 7 | `packages/invalid`<br>`packages/valid` |
| [useRegexLiterals](https://biomejs.dev/linter/rules/use-regex-literals/) | warn | ✓ | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [useSimpleNumberKeys](https://biomejs.dev/linter/rules/use-simple-number-keys/) | warn | ✓ | - | 1 | 5 | `packages/invalid`<br>`packages/valid` |
| [useSimplifiedLogicExpression](https://biomejs.dev/linter/rules/use-simplified-logic-expression/) | info |  | - | 1 | 4 | `packages/invalid`<br>`packages/valid` |
| [useWhile](https://biomejs.dev/linter/rules/use-while/) | warn |  | - | 3 | 1 | `packages/invalid`<br>`packages/valid` |

## correctness

| ルール | 既定の重大度 | recommended | ドメイン | valid | invalid | 置き場所 |
| --- | --- | :-: | --- | ---: | ---: | --- |
| [noBeforeInteractiveScriptOutsideDocument](https://biomejs.dev/linter/rules/no-before-interactive-script-outside-document/) | error |  | next | 1 | 1 | `packages/react-invalid`<br>`packages/react-valid` |
| [noChildrenProp](https://biomejs.dev/linter/rules/no-children-prop/) | error |  | react | 1 | 2 | `packages/invalid`<br>`packages/react-invalid`<br>`packages/react-valid` |
| [noConstantCondition](https://biomejs.dev/linter/rules/no-constant-condition/) | error | ✓ | - | 1 | 6 | `packages/invalid`<br>`packages/valid` |
| [noConstantMathMinMaxClamp](https://biomejs.dev/linter/rules/no-constant-math-min-max-clamp/) | error | ✓ | - | 1 | 2 | `packages/invalid`<br>`packages/valid` |
| [noConstAssign](https://biomejs.dev/linter/rules/no-const-assign/) | error | ✓ | - | 1 | 4 | `packages/invalid`<br>`packages/valid` |
| [noConstructorReturn](https://biomejs.dev/linter/rules/no-constructor-return/) | error | ✓ | - | 2 | 1 | `packages/invalid`<br>`packages/valid` |
| [noDuplicateArgumentNames](https://biomejs.dev/linter/rules/no-duplicate-argument-names/) | error | ✓ | - | 1 | 1 | `packages/graphql-invalid`<br>`packages/graphql-valid` |
| [noDuplicateAttributes](https://biomejs.dev/linter/rules/no-duplicate-attributes/) | error | ✓ | - | 1 | 2 | `packages/html-invalid`<br>`packages/html-valid`<br>`packages/vue-invalid` |
| [noDuplicateEnumValueNames](https://biomejs.dev/linter/rules/no-duplicate-enum-value-names/) | error | ✓ | - | 1 | 2 | `packages/graphql-invalid`<br>`packages/graphql-valid` |
| [noDuplicateInputFieldNames](https://biomejs.dev/linter/rules/no-duplicate-input-field-names/) | error | ✓ | - | 1 | 1 | `packages/graphql-invalid`<br>`packages/graphql-valid` |
| [noDuplicateVariableNames](https://biomejs.dev/linter/rules/no-duplicate-variable-names/) | error | ✓ | - | 1 | 1 | `packages/graphql-invalid`<br>`packages/graphql-valid` |
| [noEmptyCharacterClassInRegex](https://biomejs.dev/linter/rules/no-empty-character-class-in-regex/) | error | ✓ | - | 3 | 2 | `packages/invalid`<br>`packages/valid` |
| [noEmptyPattern](https://biomejs.dev/linter/rules/no-empty-pattern/) | error | ✓ | - | 1 | 3 | `packages/invalid`<br>`packages/valid` |
| [noGlobalDirnameFilename](https://biomejs.dev/linter/rules/no-global-dirname-filename/) | info |  | - | 1 | 4 | `packages/invalid`<br>`packages/valid` |
| [noGlobalObjectCalls](https://biomejs.dev/linter/rules/no-global-object-calls/) | error | ✓ | - | 1 | 10 | `packages/invalid`<br>`packages/valid` |
| [noInnerDeclarations](https://biomejs.dev/linter/rules/no-inner-declarations/) | error | ✓ | - | 5 | 4 | `packages/invalid`<br>`packages/valid` |
| [noInvalidBuiltinInstantiation](https://biomejs.dev/linter/rules/no-invalid-builtin-instantiation/) | error | ✓ | - | 2 | 2 | `packages/invalid`<br>`packages/valid` |
| [noInvalidConstructorSuper](https://biomejs.dev/linter/rules/no-invalid-constructor-super/) | error | ✓ | - | 2 | 2 | `packages/invalid`<br>`packages/valid` |
| [noInvalidDirectionInLinearGradient](https://biomejs.dev/linter/rules/no-invalid-direction-in-linear-gradient/) | error | ✓ | - | 2 | 2 | `packages/css-invalid`<br>`packages/css-valid` |
| [noInvalidGridAreas](https://biomejs.dev/linter/rules/no-invalid-grid-areas/) | error | ✓ | - | 2 | 3 | `packages/css-invalid`<br>`packages/css-valid` |
| [noInvalidPositionAtImportRule](https://biomejs.dev/linter/rules/no-invalid-position-at-import-rule/) | error | ✓ | - | 1 | 1 | `packages/css-invalid`<br>`packages/css-valid` |
| [noInvalidUseBeforeDeclaration](https://biomejs.dev/linter/rules/no-invalid-use-before-declaration/) | error | ✓ | - | 4 | 4 | `packages/invalid`<br>`packages/valid` |
| [noMissingVarFunction](https://biomejs.dev/linter/rules/no-missing-var-function/) | error | ✓ | - | 6 | 4 | `packages/css-invalid`<br>`packages/css-valid` |
| [noNestedComponentDefinitions](https://biomejs.dev/linter/rules/no-nested-component-definitions/) | error |  | react | 1 | 2 | `packages/react-invalid`<br>`packages/react-valid` |
| [noNextAsyncClientComponent](https://biomejs.dev/linter/rules/no-next-async-client-component/) | error |  | next | 2 | 1 | `packages/react-invalid`<br>`packages/react-valid` |
| [noNodejsModules](https://biomejs.dev/linter/rules/no-nodejs-modules/) | warn |  | - | 2 | 2 | `packages/invalid`<br>`packages/valid` |
| [noNonoctalDecimalEscape](https://biomejs.dev/linter/rules/no-nonoctal-decimal-escape/) | error | ✓ | - | 2 | 3 | `packages/invalid`<br>`packages/valid` |
| [noPrecisionLoss](https://biomejs.dev/linter/rules/no-precision-loss/) | error | ✓ | - | 1 | 4 | `packages/invalid`<br>`packages/valid` |
| [noPrivateImports](https://biomejs.dev/linter/rules/no-private-imports/) | warn |  | project | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noProcessGlobal](https://biomejs.dev/linter/rules/no-process-global/) | info |  | - | 2 | 1 | `packages/invalid`<br>`packages/valid` |
| [noQwikUseVisibleTask](https://biomejs.dev/linter/rules/no-qwik-use-visible-task/) | error |  | qwik | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noReactPropAssignments](https://biomejs.dev/linter/rules/no-react-prop-assignments/) | info |  | react | 1 | 1 | `packages/react-invalid`<br>`packages/react-valid` |
| [noRenderReturnValue](https://biomejs.dev/linter/rules/no-render-return-value/) | error |  | react | 1 | 1 | `packages/react-invalid`<br>`packages/react-valid` |
| [noRestrictedElements](https://biomejs.dev/linter/rules/no-restricted-elements/) | info |  | - | 1 | 2 | `packages/react-invalid`<br>`packages/react-valid` |
| [noSelfAssign](https://biomejs.dev/linter/rules/no-self-assign/) | error | ✓ | - | 1 | 7 | `packages/invalid`<br>`packages/valid` |
| [noSetterReturn](https://biomejs.dev/linter/rules/no-setter-return/) | error | ✓ | - | 2 | 3 | `packages/invalid`<br>`packages/valid` |
| [noSolidDestructuredProps](https://biomejs.dev/linter/rules/no-solid-destructured-props/) | info |  | solid | 2 | 3 | `packages/react-invalid`<br>`packages/react-valid` |
| [noStringCaseMismatch](https://biomejs.dev/linter/rules/no-string-case-mismatch/) | error | ✓ | - | 1 | 2 | `packages/invalid`<br>`packages/valid` |
| [noSwitchDeclarations](https://biomejs.dev/linter/rules/no-switch-declarations/) | error | ✓ | - | 1 | 3 | `packages/invalid`<br>`packages/valid` |
| [noUndeclaredDependencies](https://biomejs.dev/linter/rules/no-undeclared-dependencies/) | error |  | project | 1 | 2 | `packages/json-invalid`<br>`packages/json-valid` |
| [noUndeclaredVariables](https://biomejs.dev/linter/rules/no-undeclared-variables/) | error |  | - | 1 | 3 | `packages/invalid`<br>`packages/valid` |
| [noUnknownFunction](https://biomejs.dev/linter/rules/no-unknown-function/) | error | ✓ | - | 2 | 1 | `packages/css-invalid`<br>`packages/css-valid` |
| [noUnknownMediaFeatureName](https://biomejs.dev/linter/rules/no-unknown-media-feature-name/) | error | ✓ | - | 6 | 4 | `packages/css-invalid`<br>`packages/css-valid` |
| [noUnknownProperty](https://biomejs.dev/linter/rules/no-unknown-property/) | error | ✓ | - | 4 | 2 | `packages/css-invalid`<br>`packages/css-valid` |
| [noUnknownPseudoClass](https://biomejs.dev/linter/rules/no-unknown-pseudo-class/) | error | ✓ | - | 5 | 3 | `packages/css-invalid`<br>`packages/css-valid` |
| [noUnknownPseudoElement](https://biomejs.dev/linter/rules/no-unknown-pseudo-element/) | error | ✓ | - | 5 | 3 | `packages/css-invalid`<br>`packages/css-valid` |
| [noUnknownTypeSelector](https://biomejs.dev/linter/rules/no-unknown-type-selector/) | error | ✓ | - | 3 | 3 | `packages/css-invalid`<br>`packages/css-valid` |
| [noUnknownUnit](https://biomejs.dev/linter/rules/no-unknown-unit/) | error | ✓ | - | 4 | 2 | `packages/css-invalid`<br>`packages/css-valid` |
| [noUnmatchableAnbSelector](https://biomejs.dev/linter/rules/no-unmatchable-anb-selector/) | error | ✓ | - | 4 | 4 | `packages/css-invalid`<br>`packages/css-valid` |
| [noUnreachable](https://biomejs.dev/linter/rules/no-unreachable/) | error | ✓ | - | 1 | 3 | `packages/invalid`<br>`packages/valid` |
| [noUnreachableSuper](https://biomejs.dev/linter/rules/no-unreachable-super/) | error | ✓ | - | 2 | 3 | `packages/invalid`<br>`packages/valid` |
| [noUnresolvedImports](https://biomejs.dev/linter/rules/no-unresolved-imports/) | error |  | project | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noUnsafeFinally](https://biomejs.dev/linter/rules/no-unsafe-finally/) | error | ✓ | - | 3 | 5 | `packages/invalid`<br>`packages/valid` |
| [noUnsafeOptionalChaining](https://biomejs.dev/linter/rules/no-unsafe-optional-chaining/) | error | ✓ | - | 1 | 7 | `packages/invalid`<br>`packages/valid` |
| [noUnusedFunctionParameters](https://biomejs.dev/linter/rules/no-unused-function-parameters/) | warn | ✓ | - | 2 | 4 | `packages/invalid`<br>`packages/valid` |
| [noUnusedImports](https://biomejs.dev/linter/rules/no-unused-imports/) | warn | ✓ | - | 2 | 5 | `packages/invalid`<br>`packages/valid` |
| [noUnusedInstantiation](https://biomejs.dev/linter/rules/no-unused-instantiation/) | error |  | - | 2 | 1 | `packages/invalid`<br>`packages/valid` |
| [noUnusedLabels](https://biomejs.dev/linter/rules/no-unused-labels/) | warn | ✓ | - | 3 | 1 | `packages/invalid`<br>`packages/svelte-valid`<br>`packages/valid` |
| [noUnusedPrivateClassMembers](https://biomejs.dev/linter/rules/no-unused-private-class-members/) | warn | ✓ | - | 2 | 3 | `packages/invalid`<br>`packages/valid` |
| [noUnusedVariables](https://biomejs.dev/linter/rules/no-unused-variables/) | warn | ✓ | - | 6 | 7 | `packages/invalid`<br>`packages/valid` |
| [noVoidElementsWithChildren](https://biomejs.dev/linter/rules/no-void-elements-with-children/) | error | ✓ | - | 1 | 3 | `packages/invalid`<br>`packages/react-invalid`<br>`packages/react-valid` |
| [noVoidTypeReturn](https://biomejs.dev/linter/rules/no-void-type-return/) | error | ✓ | - | 3 | 6 | `packages/invalid`<br>`packages/valid` |
| [noVueDataObjectDeclaration](https://biomejs.dev/linter/rules/no-vue-data-object-declaration/) | error |  | vue | 7 | 1 | `packages/valid`<br>`packages/vue-invalid`<br>`packages/vue-valid` |
| [noVueDuplicateKeys](https://biomejs.dev/linter/rules/no-vue-duplicate-keys/) | error |  | vue | 2 | 3 | `packages/vue-invalid`<br>`packages/vue-valid` |
| [noVueReservedKeys](https://biomejs.dev/linter/rules/no-vue-reserved-keys/) | error |  | vue | 2 | 4 | `packages/vue-invalid`<br>`packages/vue-valid` |
| [noVueReservedProps](https://biomejs.dev/linter/rules/no-vue-reserved-props/) | error |  | vue | 4 | 4 | `packages/invalid`<br>`packages/valid`<br>`packages/vue-invalid`<br>`packages/vue-valid` |
| [noVueSetupPropsReactivityLoss](https://biomejs.dev/linter/rules/no-vue-setup-props-reactivity-loss/) | error |  | vue | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noVueVIfWithVFor](https://biomejs.dev/linter/rules/no-vue-v-if-with-v-for/) | error |  | vue | 1 | 1 | `packages/vue-invalid`<br>`packages/vue-valid` |
| [useExhaustiveDependencies](https://biomejs.dev/linter/rules/use-exhaustive-dependencies/) | error |  | react, next | 9 | 9 | `packages/invalid`<br>`packages/react-invalid`<br>`packages/react-valid`<br>`packages/valid` |
| [useGraphqlNamedOperations](https://biomejs.dev/linter/rules/use-graphql-named-operations/) | error | ✓ | - | 1 | 1 | `packages/graphql-invalid`<br>`packages/graphql-valid` |
| [useHookAtTopLevel](https://biomejs.dev/linter/rules/use-hook-at-top-level/) | error |  | react, next | 2 | 3 | `packages/invalid`<br>`packages/valid` |
| [useImageSize](https://biomejs.dev/linter/rules/use-image-size/) | error |  | qwik | 2 | 4 | `packages/react-invalid`<br>`packages/react-valid` |
| [useImportExtensions](https://biomejs.dev/linter/rules/use-import-extensions/) | warn |  | project | 12 | 1 | `packages/invalid`<br>`packages/valid` |
| [useInlineScriptId](https://biomejs.dev/linter/rules/use-inline-script-id/) | error |  | next | 2 | 2 | `packages/react-invalid`<br>`packages/react-valid` |
| [useIsNan](https://biomejs.dev/linter/rules/use-is-nan/) | error | ✓ | - | 1 | 4 | `packages/invalid`<br>`packages/valid` |
| [useJsonImportAttributes](https://biomejs.dev/linter/rules/use-json-import-attributes/) | info |  | project | 1 | 2 | `packages/invalid`<br>`packages/valid` |
| [useJsxKeyInIterable](https://biomejs.dev/linter/rules/use-jsx-key-in-iterable/) | error |  | react, qwik | 1 | 3 | `packages/react-invalid`<br>`packages/react-valid` |
| [useLoneAnonymousOperation](https://biomejs.dev/linter/rules/use-lone-anonymous-operation/) | error | ✓ | - | 1 | 1 | `packages/graphql-invalid`<br>`packages/graphql-valid` |
| [useParseIntRadix](https://biomejs.dev/linter/rules/use-parse-int-radix/) | info | ✓ | - | 1 | 5 | `packages/invalid`<br>`packages/valid` |
| [useQwikClasslist](https://biomejs.dev/linter/rules/use-qwik-classlist/) | error |  | qwik | 1 | 1 | `packages/react-invalid`<br>`packages/react-valid` |
| [useQwikMethodUsage](https://biomejs.dev/linter/rules/use-qwik-method-usage/) | error |  | qwik | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [useQwikValidLexicalScope](https://biomejs.dev/linter/rules/use-qwik-valid-lexical-scope/) | error |  | qwik | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [useSingleJsDocAsterisk](https://biomejs.dev/linter/rules/use-single-js-doc-asterisk/) | info |  | - | 3 | 3 | `packages/invalid`<br>`packages/valid` |
| [useUniqueElementIds](https://biomejs.dev/linter/rules/use-unique-element-ids/) | error |  | react | 4 | 2 | `packages/react-invalid`<br>`packages/react-valid` |
| [useValidForDirection](https://biomejs.dev/linter/rules/use-valid-for-direction/) | error | ✓ | - | 1 | 3 | `packages/invalid`<br>`packages/valid` |
| [useValidTypeof](https://biomejs.dev/linter/rules/use-valid-typeof/) | error | ✓ | - | 4 | 5 | `packages/invalid`<br>`packages/valid` |
| [useVueValidTemplateRoot](https://biomejs.dev/linter/rules/use-vue-valid-template-root/) | error |  | vue | 2 | 2 | `packages/vue-invalid`<br>`packages/vue-valid` |
| [useVueValidVBind](https://biomejs.dev/linter/rules/use-vue-valid-v-bind/) | error |  | vue | 2 | 2 | `packages/vue-invalid`<br>`packages/vue-valid` |
| [useVueValidVCloak](https://biomejs.dev/linter/rules/use-vue-valid-v-cloak/) | error |  | vue | 1 | 3 | `packages/vue-invalid`<br>`packages/vue-valid` |
| [useVueValidVElse](https://biomejs.dev/linter/rules/use-vue-valid-v-else/) | error |  | vue | 2 | 5 | `packages/vue-invalid`<br>`packages/vue-valid` |
| [useVueValidVElseIf](https://biomejs.dev/linter/rules/use-vue-valid-v-else-if/) | error |  | vue | 1 | 5 | `packages/vue-invalid`<br>`packages/vue-valid` |
| [useVueValidVHtml](https://biomejs.dev/linter/rules/use-vue-valid-v-html/) | error |  | vue | 1 | 3 | `packages/vue-invalid`<br>`packages/vue-valid` |
| [useVueValidVIf](https://biomejs.dev/linter/rules/use-vue-valid-v-if/) | error |  | vue | 3 | 5 | `packages/vue-invalid`<br>`packages/vue-valid` |
| [useVueValidVOn](https://biomejs.dev/linter/rules/use-vue-valid-v-on/) | error |  | vue | 2 | 1 | `packages/vue-invalid`<br>`packages/vue-valid` |
| [useVueValidVOnce](https://biomejs.dev/linter/rules/use-vue-valid-v-once/) | error |  | vue | 1 | 3 | `packages/vue-invalid`<br>`packages/vue-valid` |
| [useVueValidVPre](https://biomejs.dev/linter/rules/use-vue-valid-v-pre/) | error |  | vue | 1 | 3 | `packages/vue-invalid`<br>`packages/vue-valid` |
| [useVueValidVText](https://biomejs.dev/linter/rules/use-vue-valid-v-text/) | error |  | vue | 1 | 3 | `packages/vue-invalid`<br>`packages/vue-valid` |
| [useVueVForKey](https://biomejs.dev/linter/rules/use-vue-v-for-key/) | error |  | vue | 2 | 1 | `packages/vue-invalid`<br>`packages/vue-valid` |
| [useYield](https://biomejs.dev/linter/rules/use-yield/) | error | ✓ | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |

## nursery

| ルール | 既定の重大度 | recommended | ドメイン | valid | invalid | 置き場所 |
| --- | --- | :-: | --- | ---: | ---: | --- |
| [noBaseToString](https://biomejs.dev/linter/rules/no-base-to-string/) | info |  | types | 2 | 1 | `packages/invalid`<br>`packages/valid` |
| [noComponentHookFactories](https://biomejs.dev/linter/rules/no-component-hook-factories/) | error |  | react | 2 | 2 | `packages/react-invalid`<br>`packages/react-valid` |
| [noConditionalExpect](https://biomejs.dev/linter/rules/no-conditional-expect/) | info |  | test | 2 | 3 | `packages/invalid`<br>`packages/valid` |
| [noDrizzleDeleteWithoutWhere](https://biomejs.dev/linter/rules/no-drizzle-delete-without-where/) | info |  | drizzle | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noDrizzleUpdateWithoutWhere](https://biomejs.dev/linter/rules/no-drizzle-update-without-where/) | info |  | drizzle | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noDuplicateFieldDefinitionNames](https://biomejs.dev/linter/rules/no-duplicate-field-definition-names/) | info |  | - | 3 | 3 | `packages/graphql-invalid`<br>`packages/graphql-valid` |
| [noDuplicateSelectors](https://biomejs.dev/linter/rules/no-duplicate-selectors/) | warn |  | - | 3 | 3 | `packages/css-invalid`<br>`packages/css-valid` |
| [noEmptyObjectKeys](https://biomejs.dev/linter/rules/no-empty-object-keys/) | info |  | - | 1 | 5 | `packages/json-invalid`<br>`packages/json-valid` |
| [noExcessiveNestedCallbacks](https://biomejs.dev/linter/rules/no-excessive-nested-callbacks/) | warn |  | - | 2 | 2 | `packages/invalid`<br>`packages/valid` |
| [noExcessiveSelectorClasses](https://biomejs.dev/linter/rules/no-excessive-selector-classes/) | info |  | - | 2 | 3 | `packages/css-invalid`<br>`packages/css-valid` |
| [noExtendNative](https://biomejs.dev/linter/rules/no-extend-native/) | info |  | - | 2 | 3 | `packages/invalid`<br>`packages/valid` |
| [noFloatingPromises](https://biomejs.dev/linter/rules/no-floating-promises/) | info |  | types | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noIdenticalTestTitle](https://biomejs.dev/linter/rules/no-identical-test-title/) | warn |  | test | 2 | 4 | `packages/invalid`<br>`packages/valid` |
| [noImpliedEval](https://biomejs.dev/linter/rules/no-implied-eval/) | error | ✓ | - | 4 | 7 | `packages/invalid`<br>`packages/valid` |
| [noInlineStyles](https://biomejs.dev/linter/rules/no-inline-styles/) | info |  | - | 2 | 2 | `packages/invalid`<br>`packages/react-invalid`<br>`packages/react-valid`<br>`packages/valid` |
| [noInvalidPropertyInitValue](https://biomejs.dev/linter/rules/no-invalid-property-init-value/) | info | ✓ | - | 1 | 3 | `packages/css-invalid`<br>`packages/css-valid` |
| [noJsRestrictedProperties](https://biomejs.dev/linter/rules/no-js-restricted-properties/) | warn |  | - | 2 | 3 | `packages/invalid`<br>`packages/valid` |
| [noJsxLeakedDollar](https://biomejs.dev/linter/rules/no-jsx-leaked-dollar/) | warn |  | react | 3 | 2 | `packages/react-invalid`<br>`packages/react-valid` |
| [noJsxNamespace](https://biomejs.dev/linter/rules/no-jsx-namespace/) | info |  | react | 2 | 2 | `packages/react-invalid`<br>`packages/react-valid` |
| [noLoopFunc](https://biomejs.dev/linter/rules/no-loop-func/) | warn |  | - | 2 | 2 | `packages/invalid`<br>`packages/valid` |
| [noMisleadingReturnType](https://biomejs.dev/linter/rules/no-misleading-return-type/) | info |  | types | 3 | 1 | `packages/invalid`<br>`packages/valid` |
| [noMisusedPromises](https://biomejs.dev/linter/rules/no-misused-promises/) | info |  | types | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noNegationInEqualityCheck](https://biomejs.dev/linter/rules/no-negation-in-equality-check/) | warn |  | - | 2 | 2 | `packages/invalid`<br>`packages/valid` |
| [noNonScalableViewport](https://biomejs.dev/linter/rules/no-non-scalable-viewport/) | error |  | - | 1 | 2 | `packages/react-invalid`<br>`packages/react-valid` |
| [noPlaywrightElementHandle](https://biomejs.dev/linter/rules/no-playwright-element-handle/) | info |  | playwright | 3 | 3 | `packages/invalid`<br>`packages/valid` |
| [noPlaywrightEval](https://biomejs.dev/linter/rules/no-playwright-eval/) | info |  | playwright | 2 | 2 | `packages/invalid`<br>`packages/valid` |
| [noPlaywrightForceOption](https://biomejs.dev/linter/rules/no-playwright-force-option/) | info |  | playwright | 3 | 3 | `packages/invalid`<br>`packages/valid` |
| [noPlaywrightMissingAwait](https://biomejs.dev/linter/rules/no-playwright-missing-await/) | info |  | playwright | 3 | 2 | `packages/invalid`<br>`packages/valid` |
| [noPlaywrightNetworkidle](https://biomejs.dev/linter/rules/no-playwright-networkidle/) | info |  | playwright | 2 | 2 | `packages/invalid`<br>`packages/valid` |
| [noPlaywrightPagePause](https://biomejs.dev/linter/rules/no-playwright-page-pause/) | info |  | playwright | 1 | 2 | `packages/invalid`<br>`packages/valid` |
| [noPlaywrightUselessAwait](https://biomejs.dev/linter/rules/no-playwright-useless-await/) | info |  | playwright | 3 | 3 | `packages/invalid`<br>`packages/valid` |
| [noPlaywrightWaitForNavigation](https://biomejs.dev/linter/rules/no-playwright-wait-for-navigation/) | info |  | playwright | 3 | 2 | `packages/invalid`<br>`packages/valid` |
| [noPlaywrightWaitForSelector](https://biomejs.dev/linter/rules/no-playwright-wait-for-selector/) | info |  | playwright | 3 | 2 | `packages/invalid`<br>`packages/valid` |
| [noPlaywrightWaitForTimeout](https://biomejs.dev/linter/rules/no-playwright-wait-for-timeout/) | info |  | playwright | 3 | 2 | `packages/invalid`<br>`packages/valid` |
| [noReactNativeDeepImports](https://biomejs.dev/linter/rules/no-react-native-deep-imports/) | error |  | reactNative | 2 | 4 | `packages/invalid`<br>`packages/valid` |
| [noReactNativeLiteralColors](https://biomejs.dev/linter/rules/no-react-native-literal-colors/) | info |  | reactNative | 2 | 3 | `packages/react-invalid`<br>`packages/react-valid` |
| [noReactNativeRawText](https://biomejs.dev/linter/rules/no-react-native-raw-text/) | error |  | reactNative | 3 | 3 | `packages/react-invalid`<br>`packages/react-valid` |
| [noReactStringRefs](https://biomejs.dev/linter/rules/no-react-string-refs/) | warn |  | react | 1 | 3 | `packages/react-invalid`<br>`packages/react-valid` |
| [noRestrictedDependencies](https://biomejs.dev/linter/rules/no-restricted-dependencies/) | info |  | - | 3 | 3 | `packages/invalid`<br>`packages/valid` |
| [noSvelteLegacyConst](https://biomejs.dev/linter/rules/no-svelte-legacy-const/) | info |  | svelte | 1 | 1 | `packages/svelte-invalid`<br>`packages/svelte-valid` |
| [noSvelteUnnecessaryStateWrap](https://biomejs.dev/linter/rules/no-svelte-unnecessary-state-wrap/) | info |  | svelte | 2 | 4 | `packages/svelte-invalid`<br>`packages/svelte-valid` |
| [noTailwindArbitraryValue](https://biomejs.dev/linter/rules/no-tailwind-arbitrary-value/) | info |  | tailwind | 2 | 4 | `packages/react-invalid`<br>`packages/react-valid` |
| [noTopLevelLiterals](https://biomejs.dev/linter/rules/no-top-level-literals/) | info |  | - | 4 | 4 | `packages/json-invalid`<br>`packages/json-valid` |
| [noUndeclaredClasses](https://biomejs.dev/linter/rules/no-undeclared-classes/) | info |  | project | 1 | 1 | `packages/react-invalid`<br>`packages/react-valid` |
| [noUnnecessaryTemplateExpression](https://biomejs.dev/linter/rules/no-unnecessary-template-expression/) | info |  | - | 4 | 4 | `packages/invalid`<br>`packages/valid` |
| [noUnsafePlusOperands](https://biomejs.dev/linter/rules/no-unsafe-plus-operands/) | info |  | types | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noUnsafeTypeAssertion](https://biomejs.dev/linter/rules/no-unsafe-type-assertion/) | error |  | - | 6 | 3 | `packages/invalid`<br>`packages/valid` |
| [noUntrustedLicenses](https://biomejs.dev/linter/rules/no-untrusted-licenses/) | warn |  | project | 1 | 1 | 一時ディレクトリ (`tools/verify-standalone.mjs`) |
| [noUnusedClasses](https://biomejs.dev/linter/rules/no-unused-classes/) | info |  | project | 1 | 1 | `packages/css-invalid`<br>`packages/css-valid` |
| [noUselessTypeConversion](https://biomejs.dev/linter/rules/no-useless-type-conversion/) | info |  | types | 2 | 1 | `packages/invalid`<br>`packages/valid` |
| [noVueImportCompilerMacros](https://biomejs.dev/linter/rules/no-vue-import-compiler-macros/) | info |  | vue | 1 | 1 | `packages/vue-invalid`<br>`packages/vue-valid` |
| [noVueRefAsOperand](https://biomejs.dev/linter/rules/no-vue-ref-as-operand/) | error |  | vue | 3 | 4 | `packages/invalid`<br>`packages/valid` |
| [noVueVOnNumberValues](https://biomejs.dev/linter/rules/no-vue-v-on-number-values/) | info |  | vue | 2 | 2 | `packages/vue-invalid`<br>`packages/vue-valid` |
| [useArraySome](https://biomejs.dev/linter/rules/use-array-some/) | info |  | - | 1 | 6 | `packages/invalid`<br>`packages/valid` |
| [useAstroClientOnlyDirectiveValue](https://biomejs.dev/linter/rules/use-astro-client-only-directive-value/) | info |  | astro | 2 | 1 | `packages/astro-invalid`<br>`packages/astro-valid` |
| [useAwaitThenable](https://biomejs.dev/linter/rules/use-await-thenable/) | info |  | types | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [useBaseline](https://biomejs.dev/linter/rules/use-baseline/) | info |  | - | 9 | 5 | `packages/css-invalid`<br>`packages/css-valid` |
| [useConsistentTestIt](https://biomejs.dev/linter/rules/use-consistent-test-it/) | warn |  | test | 3 | 3 | `packages/invalid`<br>`packages/valid` |
| [useControlLabel](https://biomejs.dev/linter/rules/use-control-label/) | error |  | - | 4 | 3 | `packages/react-invalid`<br>`packages/react-valid` |
| [useDisposables](https://biomejs.dev/linter/rules/use-disposables/) | info |  | types | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [useDomNodeTextContent](https://biomejs.dev/linter/rules/use-dom-node-text-content/) | info | ✓ | - | 2 | 3 | `packages/invalid`<br>`packages/valid` |
| [useDomQuerySelector](https://biomejs.dev/linter/rules/use-dom-query-selector/) | info |  | - | 3 | 3 | `packages/invalid`<br>`packages/valid` |
| [useExhaustiveSwitchCases](https://biomejs.dev/linter/rules/use-exhaustive-switch-cases/) | info |  | types | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [useExpect](https://biomejs.dev/linter/rules/use-expect/) | info |  | test | 5 | 1 | `packages/invalid`<br>`packages/valid` |
| [useExplicitReturnType](https://biomejs.dev/linter/rules/use-explicit-return-type/) | warn |  | - | 16 | 7 | `packages/invalid`<br>`packages/valid` |
| [useExplicitType](https://biomejs.dev/linter/rules/use-explicit-type/) | error |  | - | 18 | 18 | `packages/invalid`<br>`packages/valid` |
| [useIframeSandbox](https://biomejs.dev/linter/rules/use-iframe-sandbox/) | warn |  | - | 1 | 1 | `packages/react-invalid`<br>`packages/react-valid` |
| [useImportsFirst](https://biomejs.dev/linter/rules/use-imports-first/) | info |  | - | 2 | 1 | `packages/invalid`<br>`packages/valid` |
| [useIncludes](https://biomejs.dev/linter/rules/use-includes/) | info |  | types | 2 | 1 | `packages/invalid`<br>`packages/valid` |
| [useMathMinMax](https://biomejs.dev/linter/rules/use-math-min-max/) | warn | ✓ | - | 3 | 2 | `packages/invalid`<br>`packages/valid` |
| [useNamedCaptureGroup](https://biomejs.dev/linter/rules/use-named-capture-group/) | info |  | - | 1 | 5 | `packages/invalid`<br>`packages/valid` |
| [useNamedLayer](https://biomejs.dev/linter/rules/use-named-layer/) | warn |  | - | 2 | 2 | `packages/css-invalid`<br>`packages/css-valid` |
| [useNullishCoalescing](https://biomejs.dev/linter/rules/use-nullish-coalescing/) | info |  | types | 10 | 9 | `packages/invalid`<br>`packages/valid` |
| [usePlaywrightValidDescribeCallback](https://biomejs.dev/linter/rules/use-playwright-valid-describe-callback/) | info |  | playwright | 2 | 2 | `packages/invalid`<br>`packages/valid` |
| [useQwikLoaderLocation](https://biomejs.dev/linter/rules/use-qwik-loader-location/) | warn |  | qwik | 1 | 3 | `packages/react-invalid`<br>`packages/react-valid` |
| [useReactAsyncServerFunction](https://biomejs.dev/linter/rules/use-react-async-server-function/) | info |  | react | 3 | 3 | `packages/invalid`<br>`packages/react-invalid`<br>`packages/react-valid`<br>`packages/valid` |
| [useReactCompiler](https://biomejs.dev/linter/rules/use-react-compiler/) | info |  | react | 1 | 2 | `packages/json-invalid`<br>`packages/react-valid` |
| [useReactFunctionComponentDefinition](https://biomejs.dev/linter/rules/use-react-function-component-definition/) | info |  | react | 4 | 6 | `packages/react-invalid`<br>`packages/react-valid` |
| [useReactNativePlatformComponents](https://biomejs.dev/linter/rules/use-react-native-platform-components/) | error |  | reactNative | 1 | 4 | `packages/invalid`<br>`packages/react-invalid`<br>`packages/valid` |
| [useReduceTypeParameter](https://biomejs.dev/linter/rules/use-reduce-type-parameter/) | info |  | - | 1 | 3 | `packages/invalid`<br>`packages/valid` |
| [useRegexpExec](https://biomejs.dev/linter/rules/use-regexp-exec/) | info |  | types | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [useRegexpTest](https://biomejs.dev/linter/rules/use-regexp-test/) | info |  | - | 1 | 2 | `packages/invalid`<br>`packages/valid` |
| [useScopedStyles](https://biomejs.dev/linter/rules/use-scoped-styles/) | info |  | vue | 2 | 2 | `packages/astro-invalid`<br>`packages/vue-invalid`<br>`packages/vue-valid` |
| [useSortedClasses](https://biomejs.dev/linter/rules/use-sorted-classes/) | info |  | - | 1 | 6 | `packages/invalid`<br>`packages/react-invalid`<br>`packages/valid` |
| [useStringStartsEndsWith](https://biomejs.dev/linter/rules/use-string-starts-ends-with/) | info |  | types | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [useSvelteRequireEachKey](https://biomejs.dev/linter/rules/use-svelte-require-each-key/) | info |  | svelte | 1 | 1 | `packages/svelte-invalid`<br>`packages/svelte-valid` |
| [useTailwindShorthandClasses](https://biomejs.dev/linter/rules/use-tailwind-shorthand-classes/) | info |  | tailwind | 1 | 1 | `packages/react-invalid`<br>`packages/react-valid` |
| [useTestHooksInOrder](https://biomejs.dev/linter/rules/use-test-hooks-in-order/) | warn |  | test | 2 | 2 | `packages/invalid`<br>`packages/valid` |
| [useTestHooksOnTop](https://biomejs.dev/linter/rules/use-test-hooks-on-top/) | warn |  | test | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [useThisInClassMethods](https://biomejs.dev/linter/rules/use-this-in-class-methods/) | warn |  | - | 5 | 2 | `packages/invalid`<br>`packages/valid` |
| [useUnicodeRegex](https://biomejs.dev/linter/rules/use-unicode-regex/) | info |  | - | 1 | 4 | `packages/invalid`<br>`packages/valid` |
| [useVarsOnTop](https://biomejs.dev/linter/rules/use-vars-on-top/) | warn |  | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [useVueConsistentDefinePropsDeclaration](https://biomejs.dev/linter/rules/use-vue-consistent-define-props-declaration/) | info |  | vue | 1 | 1 | `packages/vue-invalid`<br>`packages/vue-valid` |
| [useVueNextTickPromise](https://biomejs.dev/linter/rules/use-vue-next-tick-promise/) | info |  | vue | 1 | 1 | `packages/vue-invalid`<br>`packages/vue-valid` |
| [useVueValidVFor](https://biomejs.dev/linter/rules/use-vue-valid-v-for/) | info |  | vue | 3 | 4 | `packages/vue-invalid`<br>`packages/vue-valid` |

## performance

| ルール | 既定の重大度 | recommended | ドメイン | valid | invalid | 置き場所 |
| --- | --- | :-: | --- | ---: | ---: | --- |
| [noAccumulatingSpread](https://biomejs.dev/linter/rules/no-accumulating-spread/) | warn | ✓ | - | 3 | 4 | `packages/invalid`<br>`packages/valid` |
| [noAwaitInLoops](https://biomejs.dev/linter/rules/no-await-in-loops/) | info |  | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noBarrelFile](https://biomejs.dev/linter/rules/no-barrel-file/) | warn |  | - | 1 | 3 | `packages/invalid`<br>`packages/valid` |
| [noDelete](https://biomejs.dev/linter/rules/no-delete/) | warn |  | - | 4 | 2 | `packages/invalid`<br>`packages/valid` |
| [noDynamicNamespaceImportAccess](https://biomejs.dev/linter/rules/no-dynamic-namespace-import-access/) | warn | ✓ | - | 3 | 2 | `packages/invalid`<br>`packages/valid` |
| [noImgElement](https://biomejs.dev/linter/rules/no-img-element/) | warn |  | next | 3 | 2 | `packages/react-invalid`<br>`packages/react-valid` |
| [noJsxPropsBind](https://biomejs.dev/linter/rules/no-jsx-props-bind/) | warn |  | react | 1 | 3 | `packages/react-invalid`<br>`packages/react-valid` |
| [noNamespaceImport](https://biomejs.dev/linter/rules/no-namespace-import/) | warn |  | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noReExportAll](https://biomejs.dev/linter/rules/no-re-export-all/) | warn |  | - | 2 | 2 | `packages/invalid`<br>`packages/valid` |
| [noSyncScripts](https://biomejs.dev/linter/rules/no-sync-scripts/) | warn |  | react, next | 2 | 1 | `packages/react-invalid`<br>`packages/react-valid` |
| [noUnwantedPolyfillio](https://biomejs.dev/linter/rules/no-unwanted-polyfillio/) | warn |  | next | 1 | 2 | `packages/react-invalid`<br>`packages/react-valid` |
| [useGoogleFontPreconnect](https://biomejs.dev/linter/rules/use-google-font-preconnect/) | info |  | next | 2 | 2 | `packages/react-invalid`<br>`packages/react-valid` |
| [useSolidForComponent](https://biomejs.dev/linter/rules/use-solid-for-component/) | info |  | solid | 3 | 3 | `packages/react-invalid`<br>`packages/react-valid` |
| [useTopLevelRegex](https://biomejs.dev/linter/rules/use-top-level-regex/) | warn |  | - | 2 | 1 | `packages/invalid`<br>`packages/valid` |
| [useVueVapor](https://biomejs.dev/linter/rules/use-vue-vapor/) | warn |  | vue | 1 | 1 | `packages/vue-invalid`<br>`packages/vue-valid` |

## security

| ルール | 既定の重大度 | recommended | ドメイン | valid | invalid | 置き場所 |
| --- | --- | :-: | --- | ---: | ---: | --- |
| [noBlankTarget](https://biomejs.dev/linter/rules/no-blank-target/) | error | ✓ | - | 4 | 5 | `packages/react-invalid`<br>`packages/react-valid` |
| [noDangerouslySetInnerHtml](https://biomejs.dev/linter/rules/no-dangerously-set-inner-html/) | error |  | react | 1 | 2 | `packages/invalid`<br>`packages/react-invalid`<br>`packages/react-valid` |
| [noDangerouslySetInnerHtmlWithChildren](https://biomejs.dev/linter/rules/no-dangerously-set-inner-html-with-children/) | error |  | react | 1 | 3 | `packages/invalid`<br>`packages/react-invalid`<br>`packages/react-valid` |
| [noGlobalEval](https://biomejs.dev/linter/rules/no-global-eval/) | error | ✓ | - | 2 | 4 | `packages/invalid`<br>`packages/valid` |
| [noScriptUrl](https://biomejs.dev/linter/rules/no-script-url/) | error | ✓ | - | 3 | 3 | `packages/invalid`<br>`packages/react-invalid`<br>`packages/react-valid` |
| [noSecrets](https://biomejs.dev/linter/rules/no-secrets/) | info |  | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |

## source

| ルール | 既定の重大度 | recommended | ドメイン | valid | invalid | 置き場所 |
| --- | --- | :-: | --- | ---: | ---: | --- |
| [noDuplicateClasses](https://biomejs.dev/linter/rules/no-duplicate-classes/) | info |  | - | 1 | 2 | `packages/react-invalid`<br>`packages/react-valid` |
| [organizeImports](https://biomejs.dev/linter/rules/organize-imports/) | info | ✓ | - | 1 | 10 | `packages/invalid`<br>`packages/valid` |
| [useSortedAttributes](https://biomejs.dev/linter/rules/use-sorted-attributes/) | info |  | - | 1 | 4 | `packages/react-invalid`<br>`packages/react-valid` |
| [useSortedEnumMembers](https://biomejs.dev/linter/rules/use-sorted-enum-members/) | info |  | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [useSortedInterfaceMembers](https://biomejs.dev/linter/rules/use-sorted-interface-members/) | info |  | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [useSortedKeys](https://biomejs.dev/linter/rules/use-sorted-keys/) | info |  | - | 1 | 5 | `packages/invalid`<br>`packages/valid` |
| [useSortedPackageJson](https://biomejs.dev/linter/rules/use-sorted-package-json/) | info |  | - | 2 | 1 | `packages/json-invalid`<br>`packages/json-valid` |
| [useSortedProperties](https://biomejs.dev/linter/rules/use-sorted-properties/) | info |  | - | 2 | 2 | `packages/css-invalid`<br>`packages/css-valid` |
| [useSortedSelectionSet](https://biomejs.dev/linter/rules/use-sorted-selection-set/) | info |  | - | 1 | 1 | `packages/graphql-invalid`<br>`packages/graphql-valid` |
| [useSortedTypeFields](https://biomejs.dev/linter/rules/use-sorted-type-fields/) | info |  | - | 1 | 3 | `packages/graphql-invalid`<br>`packages/graphql-valid` |

## style

| ルール | 既定の重大度 | recommended | ドメイン | valid | invalid | 置き場所 |
| --- | --- | :-: | --- | ---: | ---: | --- |
| [noCommonJs](https://biomejs.dev/linter/rules/no-common-js/) | warn |  | - | 4 | 3 | `packages/invalid`<br>`packages/valid` |
| [noContinue](https://biomejs.dev/linter/rules/no-continue/) | info |  | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noDefaultExport](https://biomejs.dev/linter/rules/no-default-export/) | warn |  | - | 2 | 4 | `packages/invalid`<br>`packages/valid` |
| [noDescendingSpecificity](https://biomejs.dev/linter/rules/no-descending-specificity/) | warn | ✓ | - | 4 | 3 | `packages/css-invalid`<br>`packages/css-valid` |
| [noDoneCallback](https://biomejs.dev/linter/rules/no-done-callback/) | info |  | - | 2 | 2 | `packages/invalid`<br>`packages/valid` |
| [noEnum](https://biomejs.dev/linter/rules/no-enum/) | warn |  | - | 3 | 1 | `packages/invalid`<br>`packages/valid` |
| [noExcessiveClassesPerFile](https://biomejs.dev/linter/rules/no-excessive-classes-per-file/) | info |  | - | 1 | 2 | `packages/invalid`<br>`packages/valid` |
| [noExcessiveLinesPerFile](https://biomejs.dev/linter/rules/no-excessive-lines-per-file/) | info |  | - | 3 | 2 | `packages/invalid`<br>`packages/valid` |
| [noExportedImports](https://biomejs.dev/linter/rules/no-exported-imports/) | info |  | - | 1 | 3 | `packages/invalid`<br>`packages/valid` |
| [noHeadElement](https://biomejs.dev/linter/rules/no-head-element/) | warn |  | next | 1 | 1 | `packages/react-invalid`<br>`packages/react-valid` |
| [noHexColors](https://biomejs.dev/linter/rules/no-hex-colors/) | info |  | - | 2 | 3 | `packages/css-invalid`<br>`packages/css-valid` |
| [noImplicitBoolean](https://biomejs.dev/linter/rules/no-implicit-boolean/) | info |  | - | 5 | 1 | `packages/react-invalid`<br>`packages/react-valid` |
| [noIncrementDecrement](https://biomejs.dev/linter/rules/no-increment-decrement/) | info |  | - | 6 | 9 | `packages/invalid`<br>`packages/valid` |
| [noInferrableTypes](https://biomejs.dev/linter/rules/no-inferrable-types/) | info |  | - | 8 | 5 | `packages/invalid`<br>`packages/valid` |
| [noJsxLiterals](https://biomejs.dev/linter/rules/no-jsx-literals/) | info |  | - | 6 | 5 | `packages/react-invalid`<br>`packages/react-valid` |
| [noMagicNumbers](https://biomejs.dev/linter/rules/no-magic-numbers/) | info |  | - | 2 | 1 | `packages/invalid`<br>`packages/valid` |
| [noMultiAssign](https://biomejs.dev/linter/rules/no-multi-assign/) | info |  | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noMultilineString](https://biomejs.dev/linter/rules/no-multiline-string/) | info |  | - | 2 | 1 | `packages/invalid`<br>`packages/valid` |
| [noNamespace](https://biomejs.dev/linter/rules/no-namespace/) | warn |  | - | 3 | 4 | `packages/invalid`<br>`packages/valid` |
| [noNegationElse](https://biomejs.dev/linter/rules/no-negation-else/) | info |  | - | 4 | 2 | `packages/invalid`<br>`packages/valid` |
| [noNestedTernary](https://biomejs.dev/linter/rules/no-nested-ternary/) | info |  | - | 2 | 2 | `packages/invalid`<br>`packages/valid` |
| [noNonNullAssertion](https://biomejs.dev/linter/rules/no-non-null-assertion/) | warn | ✓ | - | 1 | 2 | `packages/invalid`<br>`packages/valid` |
| [noParameterAssign](https://biomejs.dev/linter/rules/no-parameter-assign/) | warn |  | - | 2 | 5 | `packages/invalid`<br>`packages/valid` |
| [noParameterProperties](https://biomejs.dev/linter/rules/no-parameter-properties/) | warn |  | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noProcessEnv](https://biomejs.dev/linter/rules/no-process-env/) | info |  | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noRestrictedGlobals](https://biomejs.dev/linter/rules/no-restricted-globals/) | warn |  | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noRestrictedImports](https://biomejs.dev/linter/rules/no-restricted-imports/) | warn |  | - | 11 | 14 | `packages/invalid`<br>`packages/valid` |
| [noRestrictedTypes](https://biomejs.dev/linter/rules/no-restricted-types/) | warn |  | - | 1 | 2 | `packages/invalid`<br>`packages/valid` |
| [noRootType](https://biomejs.dev/linter/rules/no-root-type/) | info |  | - | 1 | 2 | `packages/graphql-invalid`<br>`packages/graphql-valid` |
| [noShoutyConstants](https://biomejs.dev/linter/rules/no-shouty-constants/) | info |  | - | 3 | 1 | `packages/invalid`<br>`packages/valid` |
| [noSubstr](https://biomejs.dev/linter/rules/no-substr/) | info |  | - | 1 | 2 | `packages/invalid`<br>`packages/valid` |
| [noTernary](https://biomejs.dev/linter/rules/no-ternary/) | info |  | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noUnusedTemplateLiteral](https://biomejs.dev/linter/rules/no-unused-template-literal/) | warn |  | - | 3 | 2 | `packages/invalid`<br>`packages/valid` |
| [noUselessElse](https://biomejs.dev/linter/rules/no-useless-else/) | info |  | - | 2 | 3 | `packages/invalid`<br>`packages/valid` |
| [noValueAtRule](https://biomejs.dev/linter/rules/no-value-at-rule/) | info |  | - | 1 | 1 | `packages/css-invalid`<br>`packages/css-valid` |
| [noVueOptionsApi](https://biomejs.dev/linter/rules/no-vue-options-api/) | info |  | vue | 3 | 5 | `packages/invalid`<br>`packages/vue-invalid`<br>`packages/vue-valid` |
| [noYodaExpression](https://biomejs.dev/linter/rules/no-yoda-expression/) | info |  | - | 4 | 3 | `packages/invalid`<br>`packages/valid` |
| [useArrayLiterals](https://biomejs.dev/linter/rules/use-array-literals/) | info | ✓ | - | 2 | 5 | `packages/invalid`<br>`packages/valid` |
| [useAsConstAssertion](https://biomejs.dev/linter/rules/use-as-const-assertion/) | info |  | - | 1 | 2 | `packages/invalid`<br>`packages/valid` |
| [useAtIndex](https://biomejs.dev/linter/rules/use-at-index/) | info |  | - | 5 | 6 | `packages/invalid`<br>`packages/valid` |
| [useBlockStatements](https://biomejs.dev/linter/rules/use-block-statements/) | warn |  | - | 1 | 8 | `packages/invalid`<br>`packages/valid` |
| [useCollapsedElseIf](https://biomejs.dev/linter/rules/use-collapsed-else-if/) | info |  | - | 3 | 3 | `packages/invalid`<br>`packages/valid` |
| [useCollapsedIf](https://biomejs.dev/linter/rules/use-collapsed-if/) | info |  | - | 3 | 2 | `packages/invalid`<br>`packages/valid` |
| [useComponentExportOnlyModules](https://biomejs.dev/linter/rules/use-component-export-only-modules/) | warn |  | react | 4 | 3 | `packages/react-invalid`<br>`packages/react-valid` |
| [useConsistentArrayType](https://biomejs.dev/linter/rules/use-consistent-array-type/) | info |  | - | 1 | 3 | `packages/invalid`<br>`packages/valid` |
| [useConsistentArrowReturn](https://biomejs.dev/linter/rules/use-consistent-arrow-return/) | info |  | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [useConsistentBuiltinInstantiation](https://biomejs.dev/linter/rules/use-consistent-builtin-instantiation/) | info |  | - | 2 | 2 | `packages/invalid`<br>`packages/valid` |
| [useConsistentCurlyBraces](https://biomejs.dev/linter/rules/use-consistent-curly-braces/) | info |  | - | 1 | 3 | `packages/react-invalid`<br>`packages/react-valid` |
| [useConsistentEnumValueType](https://biomejs.dev/linter/rules/use-consistent-enum-value-type/) | info |  | types | 3 | 1 | `packages/invalid`<br>`packages/valid` |
| [useConsistentGraphqlDescriptions](https://biomejs.dev/linter/rules/use-consistent-graphql-descriptions/) | info |  | - | 1 | 2 | `packages/graphql-invalid`<br>`packages/graphql-valid` |
| [useConsistentMemberAccessibility](https://biomejs.dev/linter/rules/use-consistent-member-accessibility/) | info |  | - | 3 | 13 | `packages/invalid`<br>`packages/valid` |
| [useConsistentMethodSignatures](https://biomejs.dev/linter/rules/use-consistent-method-signatures/) | info |  | - | 6 | 6 | `packages/invalid`<br>`packages/valid` |
| [useConsistentObjectDefinitions](https://biomejs.dev/linter/rules/use-consistent-object-definitions/) | warn |  | - | 2 | 4 | `packages/invalid`<br>`packages/valid` |
| [useConsistentTypeDefinitions](https://biomejs.dev/linter/rules/use-consistent-type-definitions/) | info |  | - | 2 | 2 | `packages/invalid`<br>`packages/valid` |
| [useConst](https://biomejs.dev/linter/rules/use-const/) | warn | ✓ | - | 4 | 5 | `packages/invalid`<br>`packages/valid` |
| [useDefaultParameterLast](https://biomejs.dev/linter/rules/use-default-parameter-last/) | warn |  | - | 3 | 4 | `packages/invalid`<br>`packages/valid` |
| [useDefaultSwitchClause](https://biomejs.dev/linter/rules/use-default-switch-clause/) | warn |  | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [useDeprecatedReason](https://biomejs.dev/linter/rules/use-deprecated-reason/) | warn | ✓ | - | 1 | 1 | `packages/graphql-invalid`<br>`packages/graphql-valid` |
| [useDestructuring](https://biomejs.dev/linter/rules/use-destructuring/) | info |  | - | 5 | 2 | `packages/invalid`<br>`packages/json-valid`<br>`packages/valid` |
| [useEnumInitializers](https://biomejs.dev/linter/rules/use-enum-initializers/) | warn |  | - | 3 | 3 | `packages/invalid`<br>`packages/valid` |
| [useErrorCause](https://biomejs.dev/linter/rules/use-error-cause/) | info |  | - | 2 | 5 | `packages/invalid`<br>`packages/valid` |
| [useExplicitLengthCheck](https://biomejs.dev/linter/rules/use-explicit-length-check/) | info |  | - | 3 | 22 | `packages/invalid`<br>`packages/valid` |
| [useExponentiationOperator](https://biomejs.dev/linter/rules/use-exponentiation-operator/) | info | ✓ | - | 1 | 4 | `packages/invalid`<br>`packages/valid` |
| [useExportsLast](https://biomejs.dev/linter/rules/use-exports-last/) | info |  | - | 2 | 1 | `packages/invalid`<br>`packages/valid` |
| [useExportType](https://biomejs.dev/linter/rules/use-export-type/) | warn | ✓ | - | 1 | 8 | `packages/invalid`<br>`packages/valid` |
| [useFilenamingConvention](https://biomejs.dev/linter/rules/use-filenaming-convention/) | info |  | - | 2 | 1 | `packages/invalid`<br>`packages/json-valid`<br>`packages/valid` |
| [useForOf](https://biomejs.dev/linter/rules/use-for-of/) | info |  | - | 4 | 1 | `packages/invalid`<br>`packages/valid` |
| [useFragmentSyntax](https://biomejs.dev/linter/rules/use-fragment-syntax/) | info |  | - | 1 | 2 | `packages/react-invalid`<br>`packages/react-valid` |
| [useGlobalThis](https://biomejs.dev/linter/rules/use-global-this/) | warn |  | - | 4 | 2 | `packages/invalid`<br>`packages/valid` |
| [useGraphqlNamingConvention](https://biomejs.dev/linter/rules/use-graphql-naming-convention/) | info |  | - | 1 | 1 | `packages/graphql-invalid`<br>`packages/graphql-valid` |
| [useGroupedAccessorPairs](https://biomejs.dev/linter/rules/use-grouped-accessor-pairs/) | info |  | - | 1 | 2 | `packages/invalid`<br>`packages/valid` |
| [useImportType](https://biomejs.dev/linter/rules/use-import-type/) | warn | ✓ | - | 4 | 6 | `packages/invalid`<br>`packages/valid` |
| [useInputName](https://biomejs.dev/linter/rules/use-input-name/) | info |  | - | 4 | 4 | `packages/graphql-invalid`<br>`packages/graphql-valid` |
| [useLiteralEnumMembers](https://biomejs.dev/linter/rules/use-literal-enum-members/) | warn | ✓ | - | 4 | 1 | `packages/invalid`<br>`packages/valid` |
| [useLoneExecutableDefinition](https://biomejs.dev/linter/rules/use-lone-executable-definition/) | info |  | - | 2 | 3 | `packages/graphql-invalid`<br>`packages/graphql-valid` |
| [useNamingConvention](https://biomejs.dev/linter/rules/use-naming-convention/) | info |  | - | 11 | 8 | `packages/invalid`<br>`packages/react-valid`<br>`packages/valid` |
| [useNodeAssertStrict](https://biomejs.dev/linter/rules/use-node-assert-strict/) | warn |  | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [useNodejsImportProtocol](https://biomejs.dev/linter/rules/use-nodejs-import-protocol/) | info | ✓ | - | 1 | 3 | `packages/invalid`<br>`packages/valid` |
| [useNumberNamespace](https://biomejs.dev/linter/rules/use-number-namespace/) | info |  | - | 5 | 5 | `packages/invalid`<br>`packages/valid` |
| [useNumericSeparators](https://biomejs.dev/linter/rules/use-numeric-separators/) | info |  | - | 6 | 6 | `packages/invalid`<br>`packages/valid` |
| [useObjectSpread](https://biomejs.dev/linter/rules/use-object-spread/) | info |  | - | 3 | 4 | `packages/invalid`<br>`packages/valid` |
| [useReactFunctionComponents](https://biomejs.dev/linter/rules/use-react-function-components/) | info |  | react | 1 | 1 | `packages/react-invalid`<br>`packages/react-valid` |
| [useReadonlyClassProperties](https://biomejs.dev/linter/rules/use-readonly-class-properties/) | info |  | - | 1 | 6 | `packages/invalid`<br>`packages/valid` |
| [useSelfClosingElements](https://biomejs.dev/linter/rules/use-self-closing-elements/) | info |  | - | 7 | 3 | `packages/json-valid`<br>`packages/react-invalid`<br>`packages/react-valid` |
| [useShorthandAssign](https://biomejs.dev/linter/rules/use-shorthand-assign/) | info |  | - | 1 | 2 | `packages/invalid`<br>`packages/valid` |
| [useShorthandFunctionType](https://biomejs.dev/linter/rules/use-shorthand-function-type/) | info | ✓ | - | 5 | 2 | `packages/invalid`<br>`packages/valid` |
| [useSingleVarDeclarator](https://biomejs.dev/linter/rules/use-single-var-declarator/) | info |  | - | 2 | 1 | `packages/invalid`<br>`packages/valid` |
| [useSpreadOverApply](https://biomejs.dev/linter/rules/use-spread-over-apply/) | info |  | - | 1 | 4 | `packages/invalid`<br>`packages/valid` |
| [useSymbolDescription](https://biomejs.dev/linter/rules/use-symbol-description/) | info |  | - | 1 | 3 | `packages/invalid`<br>`packages/valid` |
| [useTemplate](https://biomejs.dev/linter/rules/use-template/) | info | ✓ | - | 2 | 4 | `packages/invalid`<br>`packages/valid` |
| [useThrowNewError](https://biomejs.dev/linter/rules/use-throw-new-error/) | info |  | - | 3 | 3 | `packages/invalid`<br>`packages/valid` |
| [useThrowOnlyError](https://biomejs.dev/linter/rules/use-throw-only-error/) | warn |  | - | 3 | 3 | `packages/invalid`<br>`packages/valid` |
| [useTrimStartEnd](https://biomejs.dev/linter/rules/use-trim-start-end/) | info |  | - | 2 | 2 | `packages/invalid`<br>`packages/valid` |
| [useUnifiedTypeSignatures](https://biomejs.dev/linter/rules/use-unified-type-signatures/) | info |  | - | 9 | 5 | `packages/invalid`<br>`packages/valid` |
| [useVueConsistentVBindStyle](https://biomejs.dev/linter/rules/use-vue-consistent-v-bind-style/) | info |  | vue | 2 | 2 | `packages/vue-invalid`<br>`packages/vue-valid` |
| [useVueConsistentVOnStyle](https://biomejs.dev/linter/rules/use-vue-consistent-v-on-style/) | info |  | vue | 2 | 2 | `packages/vue-invalid`<br>`packages/vue-valid` |
| [useVueDefineMacrosOrder](https://biomejs.dev/linter/rules/use-vue-define-macros-order/) | info |  | vue | 3 | 2 | `packages/vue-invalid`<br>`packages/vue-valid` |
| [useVueHyphenatedAttributes](https://biomejs.dev/linter/rules/use-vue-hyphenated-attributes/) | info |  | vue | 3 | 2 | `packages/vue-invalid`<br>`packages/vue-valid` |
| [useVueMultiWordComponentNames](https://biomejs.dev/linter/rules/use-vue-multi-word-component-names/) | info |  | vue | 5 | 3 | `packages/invalid`<br>`packages/valid`<br>`packages/vue-invalid`<br>`packages/vue-valid` |

## suspicious

| ルール | 既定の重大度 | recommended | ドメイン | valid | invalid | 置き場所 |
| --- | --- | :-: | --- | ---: | ---: | --- |
| [noAlert](https://biomejs.dev/linter/rules/no-alert/) | info |  | - | 4 | 3 | `packages/invalid`<br>`packages/valid` |
| [noApproximativeNumericConstant](https://biomejs.dev/linter/rules/no-approximative-numeric-constant/) | warn | ✓ | - | 2 | 2 | `packages/invalid`<br>`packages/valid` |
| [noArrayIndexKey](https://biomejs.dev/linter/rules/no-array-index-key/) | error |  | react | 2 | 4 | `packages/react-invalid`<br>`packages/react-valid` |
| [noAssignInExpressions](https://biomejs.dev/linter/rules/no-assign-in-expressions/) | error | ✓ | - | 2 | 3 | `packages/invalid`<br>`packages/valid` |
| [noAsyncPromiseExecutor](https://biomejs.dev/linter/rules/no-async-promise-executor/) | error | ✓ | - | 1 | 3 | `packages/invalid`<br>`packages/valid` |
| [noBiomeFirstException](https://biomejs.dev/linter/rules/no-biome-first-exception/) | error | ✓ | - | 1 | 1 | 一時ディレクトリ (`tools/verify-standalone.mjs`) |
| [noBitwiseOperators](https://biomejs.dev/linter/rules/no-bitwise-operators/) | info |  | - | 2 | 2 | `packages/invalid`<br>`packages/valid` |
| [noCatchAssign](https://biomejs.dev/linter/rules/no-catch-assign/) | warn | ✓ | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noClassAssign](https://biomejs.dev/linter/rules/no-class-assign/) | error | ✓ | - | 3 | 4 | `packages/invalid`<br>`packages/valid` |
| [noCommentText](https://biomejs.dev/linter/rules/no-comment-text/) | error | ✓ | - | 1 | 8 | `packages/react-invalid`<br>`packages/react-valid` |
| [noCompareNegZero](https://biomejs.dev/linter/rules/no-compare-neg-zero/) | error | ✓ | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noConfusingLabels](https://biomejs.dev/linter/rules/no-confusing-labels/) | warn | ✓ | - | 3 | 4 | `packages/invalid`<br>`packages/svelte-valid`<br>`packages/valid` |
| [noConfusingVoidType](https://biomejs.dev/linter/rules/no-confusing-void-type/) | warn | ✓ | - | 3 | 4 | `packages/invalid`<br>`packages/valid` |
| [noConsole](https://biomejs.dev/linter/rules/no-console/) | warn |  | - | 1 | 2 | `packages/invalid`<br>`packages/valid` |
| [noConstantBinaryExpressions](https://biomejs.dev/linter/rules/no-constant-binary-expressions/) | info |  | - | 6 | 9 | `packages/invalid`<br>`packages/valid` |
| [noConstEnum](https://biomejs.dev/linter/rules/no-const-enum/) | warn | ✓ | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noControlCharactersInRegex](https://biomejs.dev/linter/rules/no-control-characters-in-regex/) | error | ✓ | - | 1 | 5 | `packages/invalid`<br>`packages/valid` |
| [noDebugger](https://biomejs.dev/linter/rules/no-debugger/) | error | ✓ | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noDeprecatedImports](https://biomejs.dev/linter/rules/no-deprecated-imports/) | warn |  | project | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noDeprecatedMediaType](https://biomejs.dev/linter/rules/no-deprecated-media-type/) | warn | ✓ | - | 3 | 2 | `packages/css-invalid`<br>`packages/css-valid` |
| [noDocumentCookie](https://biomejs.dev/linter/rules/no-document-cookie/) | warn | ✓ | - | 3 | 2 | `packages/invalid`<br>`packages/valid` |
| [noDocumentImportInPage](https://biomejs.dev/linter/rules/no-document-import-in-page/) | warn |  | next | 2 | 1 | `packages/react-invalid`<br>`packages/react-valid` |
| [noDoubleEquals](https://biomejs.dev/linter/rules/no-double-equals/) | error | ✓ | - | 5 | 1 | `packages/invalid`<br>`packages/json-valid`<br>`packages/valid` |
| [noDuplicateAtImportRules](https://biomejs.dev/linter/rules/no-duplicate-at-import-rules/) | error | ✓ | - | 2 | 3 | `packages/css-invalid`<br>`packages/css-valid` |
| [noDuplicateCase](https://biomejs.dev/linter/rules/no-duplicate-case/) | error | ✓ | - | 3 | 3 | `packages/invalid`<br>`packages/valid` |
| [noDuplicateClassMembers](https://biomejs.dev/linter/rules/no-duplicate-class-members/) | error | ✓ | - | 5 | 4 | `packages/invalid`<br>`packages/valid` |
| [noDuplicateCustomProperties](https://biomejs.dev/linter/rules/no-duplicate-custom-properties/) | error | ✓ | - | 2 | 2 | `packages/css-invalid`<br>`packages/css-valid` |
| [noDuplicateDependencies](https://biomejs.dev/linter/rules/no-duplicate-dependencies/) | warn |  | - | 7 | 1 | `packages/json-invalid`<br>`packages/json-valid` |
| [noDuplicatedSpreadProps](https://biomejs.dev/linter/rules/no-duplicated-spread-props/) | warn |  | react, solid | 1 | 1 | `packages/react-invalid`<br>`packages/react-valid` |
| [noDuplicateElseIf](https://biomejs.dev/linter/rules/no-duplicate-else-if/) | error | ✓ | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noDuplicateEnumValues](https://biomejs.dev/linter/rules/no-duplicate-enum-values/) | warn | ✓ | - | 2 | 2 | `packages/invalid`<br>`packages/valid` |
| [noDuplicateFields](https://biomejs.dev/linter/rules/no-duplicate-fields/) | info | ✓ | - | 1 | 3 | `packages/graphql-invalid`<br>`packages/graphql-valid` |
| [noDuplicateFontNames](https://biomejs.dev/linter/rules/no-duplicate-font-names/) | error | ✓ | - | 1 | 3 | `packages/css-invalid`<br>`packages/css-valid` |
| [noDuplicateGraphqlOperationName](https://biomejs.dev/linter/rules/no-duplicate-graphql-operation-name/) | warn |  | - | 1 | 1 | `packages/graphql-invalid`<br>`packages/graphql-valid` |
| [noDuplicateJsxProps](https://biomejs.dev/linter/rules/no-duplicate-jsx-props/) | error | ✓ | - | 2 | 2 | `packages/react-invalid`<br>`packages/react-valid` |
| [noDuplicateObjectKeys](https://biomejs.dev/linter/rules/no-duplicate-object-keys/) | error | ✓ | - | 2 | 2 | `packages/invalid`<br>`packages/valid` |
| [noDuplicateParameters](https://biomejs.dev/linter/rules/no-duplicate-parameters/) | error | ✓ | - | 1 | 2 | `packages/invalid`<br>`packages/valid` |
| [noDuplicateProperties](https://biomejs.dev/linter/rules/no-duplicate-properties/) | error | ✓ | - | 1 | 1 | `packages/css-invalid`<br>`packages/css-valid` |
| [noDuplicateSelectorsKeyframeBlock](https://biomejs.dev/linter/rules/no-duplicate-selectors-keyframe-block/) | error | ✓ | - | 2 | 3 | `packages/css-invalid`<br>`packages/css-valid` |
| [noDuplicateTestHooks](https://biomejs.dev/linter/rules/no-duplicate-test-hooks/) | error |  | test | 1 | 2 | `packages/invalid`<br>`packages/valid` |
| [noEmptyBlock](https://biomejs.dev/linter/rules/no-empty-block/) | warn | ✓ | - | 3 | 3 | `packages/css-invalid`<br>`packages/css-valid` |
| [noEmptyBlockStatements](https://biomejs.dev/linter/rules/no-empty-block-statements/) | warn |  | - | 2 | 3 | `packages/invalid`<br>`packages/valid` |
| [noEmptyInterface](https://biomejs.dev/linter/rules/no-empty-interface/) | error | ✓ | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noEmptySource](https://biomejs.dev/linter/rules/no-empty-source/) | warn |  | - | 5 | 8 | `packages/invalid`<br>`packages/valid` |
| [noEqualsToNull](https://biomejs.dev/linter/rules/no-equals-to-null/) | warn |  | - | 2 | 2 | `packages/invalid`<br>`packages/valid` |
| [noEvolvingTypes](https://biomejs.dev/linter/rules/no-evolving-types/) | warn |  | - | 1 | 3 | `packages/invalid`<br>`packages/valid` |
| [noExplicitAny](https://biomejs.dev/linter/rules/no-explicit-any/) | warn | ✓ | - | 3 | 3 | `packages/invalid`<br>`packages/valid` |
| [noExportsInTest](https://biomejs.dev/linter/rules/no-exports-in-test/) | error |  | test | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noExtraNonNullAssertion](https://biomejs.dev/linter/rules/no-extra-non-null-assertion/) | warn | ✓ | - | 1 | 3 | `packages/invalid`<br>`packages/valid` |
| [noFallthroughSwitchClause](https://biomejs.dev/linter/rules/no-fallthrough-switch-clause/) | error | ✓ | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noFocusedTests](https://biomejs.dev/linter/rules/no-focused-tests/) | warn |  | test | 2 | 3 | `packages/invalid`<br>`packages/valid` |
| [noForIn](https://biomejs.dev/linter/rules/no-for-in/) | warn |  | - | 4 | 1 | `packages/invalid`<br>`packages/valid` |
| [noFunctionAssign](https://biomejs.dev/linter/rules/no-function-assign/) | error | ✓ | - | 7 | 7 | `packages/invalid`<br>`packages/valid` |
| [noGlobalAssign](https://biomejs.dev/linter/rules/no-global-assign/) | error | ✓ | - | 2 | 3 | `packages/invalid`<br>`packages/valid` |
| [noGlobalIsFinite](https://biomejs.dev/linter/rules/no-global-is-finite/) | warn | ✓ | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noGlobalIsNan](https://biomejs.dev/linter/rules/no-global-is-nan/) | warn | ✓ | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noHeadImportInDocument](https://biomejs.dev/linter/rules/no-head-import-in-document/) | warn |  | next | 2 | 1 | `packages/react-invalid`<br>`packages/react-valid` |
| [noImplicitAnyLet](https://biomejs.dev/linter/rules/no-implicit-any-let/) | error | ✓ | - | 1 | 2 | `packages/invalid`<br>`packages/valid` |
| [noImportantInKeyframe](https://biomejs.dev/linter/rules/no-important-in-keyframe/) | error | ✓ | - | 1 | 1 | `packages/css-invalid`<br>`packages/css-valid` |
| [noImportAssign](https://biomejs.dev/linter/rules/no-import-assign/) | error | ✓ | - | 1 | 8 | `packages/invalid`<br>`packages/valid` |
| [noImportCycles](https://biomejs.dev/linter/rules/no-import-cycles/) | warn |  | project | 1 | 2 | `packages/invalid`<br>`packages/valid` |
| [noIrregularWhitespace](https://biomejs.dev/linter/rules/no-irregular-whitespace/) | warn | ✓ | - | 2 | 2 | `packages/invalid`<br>`packages/valid` |
| [noLabelVar](https://biomejs.dev/linter/rules/no-label-var/) | error | ✓ | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noLeakedRender](https://biomejs.dev/linter/rules/no-leaked-render/) | warn |  | react | 5 | 3 | `packages/react-invalid`<br>`packages/react-valid` |
| [noMisleadingCharacterClass](https://biomejs.dev/linter/rules/no-misleading-character-class/) | error | ✓ | - | 1 | 6 | `packages/invalid`<br>`packages/valid` |
| [noMisleadingInstantiator](https://biomejs.dev/linter/rules/no-misleading-instantiator/) | error | ✓ | - | 1 | 2 | `packages/invalid`<br>`packages/valid` |
| [noMisplacedAssertion](https://biomejs.dev/linter/rules/no-misplaced-assertion/) | warn |  | - | 4 | 4 | `packages/invalid`<br>`packages/valid` |
| [noMisrefactoredShorthandAssign](https://biomejs.dev/linter/rules/no-misrefactored-shorthand-assign/) | error | ✓ | - | 3 | 3 | `packages/invalid`<br>`packages/valid` |
| [noNestedPromises](https://biomejs.dev/linter/rules/no-nested-promises/) | warn |  | - | 4 | 3 | `packages/invalid`<br>`packages/valid` |
| [noNonNullAssertedOptionalChain](https://biomejs.dev/linter/rules/no-non-null-asserted-optional-chain/) | error | ✓ | - | 3 | 3 | `packages/invalid`<br>`packages/valid` |
| [noOctalEscape](https://biomejs.dev/linter/rules/no-octal-escape/) | warn | ✓ | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noParametersOnlyUsedInRecursion](https://biomejs.dev/linter/rules/no-parameters-only-used-in-recursion/) | warn |  | - | 3 | 5 | `packages/invalid`<br>`packages/valid` |
| [noProto](https://biomejs.dev/linter/rules/no-proto/) | warn | ✓ | - | 3 | 2 | `packages/invalid`<br>`packages/valid` |
| [noPrototypeBuiltins](https://biomejs.dev/linter/rules/no-prototype-builtins/) | warn | ✓ | - | 1 | 4 | `packages/invalid`<br>`packages/valid` |
| [noQuickfixBiome](https://biomejs.dev/linter/rules/no-quickfix-biome/) | info | ✓ | - | 1 | 1 | `packages/json-invalid`<br>`packages/json-valid` |
| [noReactForwardRef](https://biomejs.dev/linter/rules/no-react-forward-ref/) | warn |  | react | 2 | 2 | `packages/react-invalid`<br>`packages/react-valid` |
| [noReactSpecificProps](https://biomejs.dev/linter/rules/no-react-specific-props/) | warn |  | solid, qwik | 1 | 1 | `packages/react-invalid`<br>`packages/react-valid` |
| [noRedeclare](https://biomejs.dev/linter/rules/no-redeclare/) | error | ✓ | - | 2 | 5 | `packages/invalid`<br>`packages/valid` |
| [noRedundantUseStrict](https://biomejs.dev/linter/rules/no-redundant-use-strict/) | warn | ✓ | - | 2 | 5 | `packages/invalid`<br>`packages/valid` |
| [noReturnAssign](https://biomejs.dev/linter/rules/no-return-assign/) | error |  | - | 2 | 1 | `packages/invalid`<br>`packages/valid` |
| [noSelfCompare](https://biomejs.dev/linter/rules/no-self-compare/) | error | ✓ | - | 1 | 2 | `packages/invalid`<br>`packages/valid` |
| [noShadow](https://biomejs.dev/linter/rules/no-shadow/) | warn |  | - | 1 | 5 | `packages/invalid`<br>`packages/valid` |
| [noShadowRestrictedNames](https://biomejs.dev/linter/rules/no-shadow-restricted-names/) | error | ✓ | - | 1 | 5 | `packages/invalid`<br>`packages/valid` |
| [noShorthandPropertyOverrides](https://biomejs.dev/linter/rules/no-shorthand-property-overrides/) | error | ✓ | - | 2 | 1 | `packages/css-invalid`<br>`packages/css-valid` |
| [noSkippedTests](https://biomejs.dev/linter/rules/no-skipped-tests/) | warn |  | test | 1 | 3 | `packages/invalid`<br>`packages/valid` |
| [noSparseArray](https://biomejs.dev/linter/rules/no-sparse-array/) | error | ✓ | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noSuspiciousSemicolonInJsx](https://biomejs.dev/linter/rules/no-suspicious-semicolon-in-jsx/) | warn | ✓ | - | 1 | 1 | `packages/react-invalid`<br>`packages/react-valid` |
| [noTemplateCurlyInString](https://biomejs.dev/linter/rules/no-template-curly-in-string/) | warn | ✓ | - | 1 | 3 | `packages/invalid`<br>`packages/valid` |
| [noThenProperty](https://biomejs.dev/linter/rules/no-then-property/) | error | ✓ | - | 4 | 7 | `packages/invalid`<br>`packages/valid` |
| [noTsIgnore](https://biomejs.dev/linter/rules/no-ts-ignore/) | warn | ✓ | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noUnassignedVariables](https://biomejs.dev/linter/rules/no-unassigned-variables/) | info |  | - | 2 | 2 | `packages/invalid`<br>`packages/valid` |
| [noUndeclaredEnvVars](https://biomejs.dev/linter/rules/no-undeclared-env-vars/) | warn |  | turborepo | 2 | 1 | `packages/invalid`<br>`packages/valid` |
| [noUnknownAtRules](https://biomejs.dev/linter/rules/no-unknown-at-rules/) | error | ✓ | - | 3 | 2 | `packages/css-invalid`<br>`packages/css-valid` |
| [noUnknownAttribute](https://biomejs.dev/linter/rules/no-unknown-attribute/) | warn |  | react | 5 | 3 | `packages/react-invalid`<br>`packages/react-valid` |
| [noUnnecessaryConditions](https://biomejs.dev/linter/rules/no-unnecessary-conditions/) | warn |  | types | 1 | 8 | `packages/invalid`<br>`packages/valid` |
| [noUnsafeDeclarationMerging](https://biomejs.dev/linter/rules/no-unsafe-declaration-merging/) | error | ✓ | - | 2 | 1 | `packages/invalid`<br>`packages/valid` |
| [noUnsafeNegation](https://biomejs.dev/linter/rules/no-unsafe-negation/) | error | ✓ | - | 1 | 2 | `packages/invalid`<br>`packages/valid` |
| [noUnusedExpressions](https://biomejs.dev/linter/rules/no-unused-expressions/) | warn |  | - | 2 | 18 | `packages/invalid`<br>`packages/react-invalid`<br>`packages/valid` |
| [noUselessEscapeInString](https://biomejs.dev/linter/rules/no-useless-escape-in-string/) | warn | ✓ | - | 4 | 3 | `packages/invalid`<br>`packages/react-valid`<br>`packages/valid` |
| [noUselessRegexBackrefs](https://biomejs.dev/linter/rules/no-useless-regex-backrefs/) | warn | ✓ | - | 3 | 5 | `packages/invalid`<br>`packages/valid` |
| [noVar](https://biomejs.dev/linter/rules/no-var/) | warn |  | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [noVueArrowFuncInWatch](https://biomejs.dev/linter/rules/no-vue-arrow-func-in-watch/) | warn |  | vue | 1 | 2 | `packages/vue-invalid`<br>`packages/vue-valid` |
| [noWith](https://biomejs.dev/linter/rules/no-with/) | error | ✓ | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [useAdjacentOverloadSignatures](https://biomejs.dev/linter/rules/use-adjacent-overload-signatures/) | warn | ✓ | - | 4 | 3 | `packages/invalid`<br>`packages/valid` |
| [useArraySortCompare](https://biomejs.dev/linter/rules/use-array-sort-compare/) | warn |  | types | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [useAwait](https://biomejs.dev/linter/rules/use-await/) | warn |  | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [useBiomeIgnoreFolder](https://biomejs.dev/linter/rules/use-biome-ignore-folder/) | warn | ✓ | - | 1 | 1 | `packages/json-invalid`<br>`packages/json-valid` |
| [useDefaultSwitchClauseLast](https://biomejs.dev/linter/rules/use-default-switch-clause-last/) | warn | ✓ | - | 2 | 3 | `packages/invalid`<br>`packages/valid` |
| [useDeprecatedDate](https://biomejs.dev/linter/rules/use-deprecated-date/) | warn |  | - | 1 | 1 | `packages/graphql-invalid`<br>`packages/graphql-valid` |
| [useErrorMessage](https://biomejs.dev/linter/rules/use-error-message/) | warn |  | - | 3 | 4 | `packages/invalid`<br>`packages/valid` |
| [useGetterReturn](https://biomejs.dev/linter/rules/use-getter-return/) | error | ✓ | - | 2 | 3 | `packages/invalid`<br>`packages/valid` |
| [useGoogleFontDisplay](https://biomejs.dev/linter/rules/use-google-font-display/) | warn | ✓ | - | 3 | 4 | `packages/react-invalid`<br>`packages/react-valid` |
| [useGuardForIn](https://biomejs.dev/linter/rules/use-guard-for-in/) | warn |  | - | 3 | 1 | `packages/invalid`<br>`packages/valid` |
| [useIsArray](https://biomejs.dev/linter/rules/use-is-array/) | warn | ✓ | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |
| [useIterableCallbackReturn](https://biomejs.dev/linter/rules/use-iterable-callback-return/) | error | ✓ | - | 5 | 2 | `packages/invalid`<br>`packages/valid` |
| [useNamespaceKeyword](https://biomejs.dev/linter/rules/use-namespace-keyword/) | error | ✓ | - | 2 | 1 | `packages/invalid`<br>`packages/valid` |
| [useNumberToFixedDigitsArgument](https://biomejs.dev/linter/rules/use-number-to-fixed-digits-argument/) | warn |  | - | 2 | 1 | `packages/invalid`<br>`packages/valid` |
| [useRequiredScripts](https://biomejs.dev/linter/rules/use-required-scripts/) | warn |  | - | 3 | 1 | `packages/json-invalid`<br>`packages/json-valid` |
| [useStaticResponseMethods](https://biomejs.dev/linter/rules/use-static-response-methods/) | info |  | - | 3 | 3 | `packages/invalid`<br>`packages/valid` |
| [useStrictMode](https://biomejs.dev/linter/rules/use-strict-mode/) | warn |  | - | 1 | 1 | `packages/invalid`<br>`packages/valid` |

