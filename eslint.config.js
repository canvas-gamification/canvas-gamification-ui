// @ts-check
const eslint = require('@eslint/js')
const tseslint = require('typescript-eslint')
const angular = require('angular-eslint')
const stylistic = require('@stylistic/eslint-plugin')

module.exports = tseslint.config(
    {
        ignores: ['dist/**', 'coverage/**', 'node_modules/**']
    },
    {
        files: ['**/*.ts'],
        extends: [
            eslint.configs.recommended,
            ...tseslint.configs.recommended,
            ...angular.configs.tsRecommended,
        ],
        processor: angular.processInlineTemplates,
        plugins: {
            '@stylistic': stylistic
        },
        rules: {
            'guard-for-in': 'off',
            'eqeqeq': 'error',
            'camelcase': 'off',
            'object-curly-spacing': ['error', 'never'],
            'function-paren-newline': ['error', 'multiline-arguments'],
            '@stylistic/max-len': ['warn', {code: 100}],
            '@stylistic/indent': [
                'error',
                4,
                {
                    FunctionExpression: {
                        parameters: 'first',
                        body: 1
                    },
                    SwitchCase: 1
                }
            ],
            '@stylistic/semi': ['error', 'never'],
            '@stylistic/brace-style': ['error', '1tbs'],
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    vars: 'local',
                    args: 'none',
                    caughtErrors: 'none'
                }
            ],
            '@angular-eslint/prefer-on-push-component-change-detection': 'off',
            // The app deliberately uses NgModules and constructor DI; migrating to
            // standalone components and inject() is a separate refactor.
            '@angular-eslint/prefer-standalone': 'off',
            '@angular-eslint/prefer-inject': 'off',
            '@typescript-eslint/no-empty-object-type': 'off',
            '@typescript-eslint/naming-convention': [
                'error',
                {
                    selector: 'default',
                    format: ['camelCase']
                },
                {
                    selector: 'import',
                    format: null
                },
                // Data keys that need quoting (e.g. survey codes) are not identifiers
                {
                    selector: 'objectLiteralProperty',
                    modifiers: ['requiresQuotes'],
                    format: null
                },
                {
                    selector: 'variable',
                    format: ['camelCase', 'UPPER_CASE']
                },
                {
                    selector: 'typeLike',
                    format: ['PascalCase']
                },
                // This is only because our APIs are snake_case
                // No other member should be snake_case
                {
                    selector: 'memberLike',
                    format: ['camelCase', 'snake_case', 'UPPER_CASE']
                }
            ]
        }
    },
    {
        files: ['**/*.html'],
        extends: [
            ...angular.configs.templateRecommended,
        ],
        rules: {
            '@angular-eslint/template/no-duplicate-attributes': ['error'],
            '@angular-eslint/template/alt-text': ['error'],
            '@angular-eslint/template/elements-content': ['warn'],
            '@angular-eslint/template/valid-aria': ['error'],
            '@angular-eslint/template/banana-in-box': ['error'],
            '@angular-eslint/template/eqeqeq': ['error', {allowNullOrUndefined: true}]
        }
    }
)
