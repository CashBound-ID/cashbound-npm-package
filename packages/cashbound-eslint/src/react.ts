import type { Linter } from 'eslint';

import eslintJestConfig from './config/jest';
import eslintReactConfig from './config/react';
import eslintSharedConfig from './config/shared';
import { hofEslintConfigGenerator } from './utils/eslint-config';

const templateEslintReact: Linter.Config[] = [
  ...eslintSharedConfig(),
  ...eslintReactConfig(),
  ...eslintJestConfig()
];

const eslintReact = hofEslintConfigGenerator({
  defaultConfig: templateEslintReact
});

export default eslintReact;
