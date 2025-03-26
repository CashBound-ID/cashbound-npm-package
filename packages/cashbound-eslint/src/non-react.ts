import type { Linter } from 'eslint';

import eslintFitHubJestConfig from './config/jest';
import eslintFitHubSharedConfig from './config/shared';
import { hofEslintConfigGenerator } from './utils/eslint-config';

const templateEslintFitHubNonReact: Linter.Config[] = [
  ...eslintFitHubSharedConfig(),
  ...eslintFitHubJestConfig()
];

const eslintFitHubNonReact = hofEslintConfigGenerator({
  defaultConfig: templateEslintFitHubNonReact
});

export default eslintFitHubNonReact;
