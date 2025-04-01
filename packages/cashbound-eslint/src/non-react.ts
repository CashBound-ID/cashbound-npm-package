import type { Linter } from 'eslint';

import eslintJestConfig from './config/jest';
import eslintSharedConfig from './config/shared';
import { hofEslintConfigGenerator } from './utils/eslint-config';

const templateEslintNonReact: Linter.Config[] = [
  ...eslintSharedConfig(),
  ...eslintJestConfig()
];

const eslintNonReact = hofEslintConfigGenerator({
  defaultConfig: templateEslintNonReact
});

export default eslintNonReact;
