import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginSimpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginSortDestructureKeys from 'eslint-plugin-sort-destructure-keys';
import eslintPluginSortKeysFix from 'eslint-plugin-sort-keys-fix';
import eslintPluginTypescriptSortKeys from 'eslint-plugin-typescript-sort-keys';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  /////////////////////////////////////////////////////////////////////////////
  // Shared Config
  /////////////////////////////////////////////////////////////////////////////

  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.commonjs, ...globals.node }
    }
  },
  {
    files: [`**/*.{js,cjs,ts,jsx,tsx}`],
    rules: {
      'import/default': 'off',
      'import/namespace': 'off',
      'import/no-named-as-default-member': 'off',
      'import/order': 'off',
      indent: 'off',
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error']
        }
      ],
      'no-unused-vars': 'off'
    },
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx']
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true
        }
      }
    }
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: [`**/*.{ts,tsx}`],
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          disallowTypeAnnotations: false,
          prefer: 'type-imports'
        }
      ]
    }
  },
  {
    files: [`**/*.js`],
    ...tseslint.configs.disableTypeChecked
  },

  /////////////////////////////////////////////////////////////////////////////
  // Eslint Auto Formatting Pluggin
  /////////////////////////////////////////////////////////////////////////////

  eslintPluginPrettierRecommended,
  {
    plugins: {
      'simple-import-sort': eslintPluginSimpleImportSort,
      'sort-destructure-keys': eslintPluginSortDestructureKeys,
      'sort-keys-fix': eslintPluginSortKeysFix,
      'typescript-sort-keys': eslintPluginTypescriptSortKeys
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          arrowParens: 'always',
          bracketSameLine: false,
          bracketSpacing: true,
          embeddedLanguageFormatting: 'auto',
          experimentalTernaries: false,
          htmlWhitespaceSensitivity: 'css',
          insertPragma: false,
          jsxBracketSameLine: false,
          jsxSingleQuote: false,
          proseWrap: 'preserve',
          quoteProps: 'as-needed',
          rangeStart: 0,
          requirePragma: false,
          semi: true,
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'none',
          useTabs: false
        },
        {
          usePrettierrc: false
        }
      ],
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^@?\\w'],
            ['@/utils', '@/config'],
            [
              '^\\u0000',
              '^\\.\\.(?!/?$)',
              '^\\.\\./?$',
              '^\\./(?=.*/)(?!/?$)',
              '^\\.(?!/?$)',
              '^\\./?$'
            ]
          ]
        }
      ],
      'sort-destructure-keys/sort-destructure-keys': [
        'error',
        { caseSensitive: false }
      ],
      'sort-imports': 'off',
      'sort-keys-fix/sort-keys-fix': 'error',
      'typescript-sort-keys/interface': 'error',
      'typescript-sort-keys/string-enum': 'error'
    }
  },
  {
    ignores: [
      'etc/*',
      'dist/*',
      'node_modules/*',
      'jest.config.js',
      'coverage/*',
      'non-react-pre-commit.d.ts',
      'non-react-pre-commit.js',
      'non-react.d.ts',
      'non-react.js',
      'react-pre-commit.d.ts',
      'react-pre-commit.js',
      'react.d.ts',
      'react.js',
      '.tmp_staging/*'
    ]
  }
];
