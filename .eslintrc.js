module.exports = {
  extends: 'next/core-web-vitals',
  overrides: [
    {
      files: ['**/*.{msj,cjs,js,jsx}'],
      rules: {
        'no-shadow': 'error',
        'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
        'no-unused-expressions': [2, { allowShortCircuit: true, allowTernary: true }],
      },
    },
    {
      files: ['**/*.{ts,tsx}'],
      extends: ['plugin:@typescript-eslint/recommended'],
      plugins: ['@typescript-eslint', 'typescript-sort-keys'],
      rules: {
        'no-shadow': 'off',
        'no-unused-vars': 'off',
        'no-unused-expressions': 'off',
        'typescript-sort-keys/interface': 'warn',
        'typescript-sort-keys/string-enum': 'warn',
        '@typescript-eslint/no-shadow': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/no-unused-expressions': [
          2,
          { allowShortCircuit: true, allowTernary: true },
        ],
        '@typescript-eslint/no-explicit-any': ['off'],
      },
    },

    {
      files: ['**/*.{ts,tsx,msj,cjs,js,jsx}'],
      plugins: ['simple-import-sort', 'unused-imports', 'import', ,],
      extends: ['plugin:prettier/recommended', 'prettier'],
      rules: {
        'unused-imports/no-unused-imports': 'warn',
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'import/first': 'error',
        'import/newline-after-import': 'error',
        'import/no-duplicates': ['error', { 'prefer-inline': true }],
        'padding-line-between-statements': [
          'warn',
          { blankLine: 'always', prev: '*', next: 'return' },
          { blankLine: 'always', prev: ['const', 'let'], next: '*' },
          {
            blankLine: 'any',
            prev: ['const', 'let'],
            next: ['const', 'let'],
          },
        ],
        'react-hooks/exhaustive-deps': 'off',
        'react/self-closing-comp': 'warn',
        'react/display-name': 'off',
        'react/jsx-sort-props': [
          'warn',
          {
            callbacksLast: true,
            shorthandFirst: true,
            noSortAlphabetically: false,
            reservedFirst: true,
          },
        ],
      },
    },
  ],
};
