import type { Linter } from 'eslint';

import eslintFitHubJestConfig from './config/jest';
import eslintFitHubReactConfig from './config/react';
import eslintFitHubSharedConfig from './config/shared';
import { hofEslintConfigGenerator } from './utils/eslint-config';

const templateEslintFitHubReact: Linter.Config[] = [
  ...eslintFitHubSharedConfig(),
  ...eslintFitHubReactConfig(),
  ...eslintFitHubJestConfig()
];

const eslintFitHubReact = hofEslintConfigGenerator({
  defaultConfig: templateEslintFitHubReact
});

export default eslintFitHubReact;
