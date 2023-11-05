module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    // https://github.com/eslint/eslint/blob/master/conf/eslint-recommended.js
    'eslint:recommended',
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/eslint-recommended.ts
    'plugin:@typescript-eslint/eslint-recommended',
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/src/configs/recommended.ts
    'plugin:@typescript-eslint/recommended',
    // https://github.com/benmosher/eslint-plugin-import/blob/master/config/recommended.js
    'plugin:import/recommended',
    // https://github.com/benmosher/eslint-plugin-import/blob/master/config/typescript.js
    'plugin:import/typescript',
    // Enables eslint-plugin-prettier and eslint-config-prettier
    'plugin:prettier/recommended',
    // Disable any additional rules that might conflict with Prettier
    'prettier'
  ],
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'import'
  ],
  ignorePatterns: ['build', '.eslintrc.cjs'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', 'mts']
    },
    'import/resolver': {
      typescript: {} // this loads <rootdir>/tsconfig.json to eslint
    }
  },
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off', // off for frontend
    'arrow-parens': [
      'off',
      'always'
    ],
    'brace-style': [
      'off',
      'off'
    ],
    'comma-dangle': 'off',
    'complexity': 'off',
    'constructor-super': 'error',
    'eol-last': 'off',
    'eqeqeq': [
      'error',
      'smart'
    ],
    'guard-for-in': 'error',
    'id-blacklist': [
      'error',
      'any',
      'Number',
      'number',
      'String',
      'string',
      'Boolean',
      'boolean',
      'Undefined',
      'undefined'
    ],
    'id-match': 'error',
    'import/no-anonymous-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-internal-modules': 'off',
    'import/no-named-as-default': 'off',  // Changed off for frontend
    'import/no-named-as-default-member': 'off',  // Changed off for frontend
    'import/no-unresolved': 'error',
    'linebreak-style': 'off',
    'max-classes-per-file': 'off',
    'max-len': 'off',
    'new-parens': 'off',
    'newline-per-chained-call': 'off',
    'no-bitwise': 'off',
    'no-caller': 'error',
    'no-case-declarations': 'off',
    'no-cond-assign': 'error',
    'no-console': 'off',  // Changed off for frontend
    'no-debugger': 'error',
    'no-duplicate-case': 'error',
    'no-duplicate-imports': 'error',
    'no-empty': 'off',
    'no-eval': 'error',
    'no-extra-bind': 'error',
    'no-extra-semi': 'error',
    'no-fallthrough': 'off',
    'no-invalid-this': 'off',
    'no-irregular-whitespace': 'off',
    'no-multiple-empty-lines': 'off',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-redeclare': 'error',
    'no-return-await': 'error',
    'no-sequences': 'error',
    'no-shadow': [
      'off',
      {
        'hoist': 'all'
      }
    ],
    'no-sparse-arrays': 'error',
    'no-template-curly-in-string': 'error',
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'error',
    'no-undef-init': 'error',
    'no-underscore-dangle': 'off',
    'no-unsafe-finally': 'error',
    'no-unused-labels': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'one-var': [
      'error',
      'never'
    ],
    'padding-line-between-statements': [
      'warn',
      // empty line before control flow blocks
      { blankLine: 'always', prev: '*', next: ['switch', 'for', 'while', 'do'] },
      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'any', prev: ['singleline-const', 'singleline-let', 'singleline-var'], next: 'block-like' },
      { blankLine: 'always', prev: '*', next: 'try' },
      { blankLine: 'always', prev: '*', next: 'with' },

      // Empty line before and after vars declarations
      { blankLine: 'always', prev: ['multiline-const', 'multiline-let', 'multiline-var'], next: '*'},
      { blankLine: 'always', prev: '*', next: ['const', 'let', 'var']},
      { blankLine: 'any',    prev: ['const', 'let', 'var'], next: ['const', 'let', 'var']},
    ],
    'prefer-const': 'error',
    'prefer-object-spread': 'error',
    'quote-props': 'off',
    'radix': 'error',
    'sort-imports': 'off',
    'space-before-function-paren': 'off',
    'space-in-parens': [
      'off',
      'never'
    ],
    'spaced-comment': [
      'error',
      'always',
      {
        'markers': [
          '/'
        ]
      }
    ],
    'use-isnan': 'error',
    'valid-typeof': 'off',
    // TypeScript's `noFallthroughCasesInSwitch` option is more robust (#6906)
    'default-case': 'off',
    // 'tsc' already handles this (https://github.com/typescript-eslint/typescript-eslint/issues/291)
    'no-dupe-class-members': 'off',
    // 'tsc' already handles this (https://github.com/typescript-eslint/typescript-eslint/issues/477)
    'no-undef': 'off',

    // Add TypeScript specific rules (and turn off ESLint equivalents)
    '@typescript-eslint/consistent-type-assertions': 'warn',
    'no-array-constructor': 'off',
    '@typescript-eslint/no-array-constructor': 'warn',
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'warn',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': [
      'warn',
      {
        functions: false,
        classes: false,
        variables: false,
        typedefs: false,
      },
    ],
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': [
      'error',
      {
        allowShortCircuit: true,
        allowTernary: true,
        allowTaggedTemplates: true,
      },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        args: 'none',
        ignoreRestSiblings: true,
      },
    ],
    'no-useless-constructor': 'off',
    '@typescript-eslint/no-useless-constructor': 'warn'
  }
};
