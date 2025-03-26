import type { Linter } from 'eslint';

import eslintFitHubJestConfig from './config/jest';
import eslintFitHubSharedConfig from './config/shared';
import { hofEslintConfigGenerator } from './utils/eslint-config';

const templateEslintFitHubReactPreCommit: Linter.Config[] = [
  ...eslintFitHubSharedConfig('.tmp_staging/**'),
  ...eslintFitHubJestConfig('.tmp_staging/**/__tests__'),
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        project: ['./tsconfig.pre-commit.json'],
        sourceType: 'module',
        tsconfigRootDir: '.'
      }
    }
  }
];

const eslintFitHubNonReactPreCommit = hofEslintConfigGenerator({
  defaultConfig: templateEslintFitHubReactPreCommit,
  isPreCommit: true
});

export default eslintFitHubNonReactPreCommit;
