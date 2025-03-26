import type { Linter } from 'eslint';

import eslintFitHubJestConfig from './config/jest';
import eslintFitHubReactConfig from './config/react';
import eslintFitHubSharedConfig from './config/shared';
import { hofEslintConfigGenerator } from './utils/eslint-config';

const templateEslintFitHubReactPreCommit: Linter.Config[] = [
  ...eslintFitHubSharedConfig('.tmp_staging/**'),
  ...eslintFitHubReactConfig('./tsconfig.pre-commit.json'),
  ...eslintFitHubJestConfig('.tmp_staging/**/__tests__')
];

const eslintFitHubReactPreCommit = hofEslintConfigGenerator({
  defaultConfig: templateEslintFitHubReactPreCommit,
  isPreCommit: true
});

export default eslintFitHubReactPreCommit;
