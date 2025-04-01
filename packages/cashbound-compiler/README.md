# Compiler Package

This npm package provides a set of shared compiler configurations. Currently, it includes configurations for Rollup and TypeScript (tsconfig).


## Installation

To install this package, use your preferred package manager:

### Using pnpm
```bash
pnpm add @cashbound-id/compiler
```

### Using npm
```bash
npm install @cashbound-id/compiler
```

### Using yarn
```bash
yarn add @cashbound-id/compiler
```

## Provided Configuration
### Rollup Configuration
To use this configuration you need to create the rollup configuration first and import the config from our npm package.

#### Step 1: Create or update your rollup config

In your project root, create a `rollup.config.cjs` file (if it doesn't already exists) and do import our config provided by this package
```js
import { rollupConfig } from '@cashbound-id/compiler/rollup.cjs';

export default rollupConfig({ baseDir: __dirname });
```

#### Step 2: Customize

You can customize the `compilerOptions` or any other properties in your `tsconfig.json` to fit your project’s specific needs.

### TS Config
To use the `tsconfig.json` template from this package, extend it in your project's `tsconfig.json` file.

#### Step 1: Create or update your `tsconfig.json`

In your project root, create a `tsconfig.json` file (if it doesn’t already exist) and extend the template provided by this package:

```json
{
  "extends": "@cashbound-id/compiler/tsconfig.json",
  "compilerOptions": {
    // You can override or add your own options here
  }
}
```

#### Step 2: Customize

You can customize the `compilerOptions` or any other properties in your `tsconfig.json` to fit your project’s specific needs.

#### Template Overview

This template provides a basic setup for TypeScript projects, including options like:

- **`target`**: Specifies the target JavaScript language version.
- **`module`**: Determines the module system (e.g., CommonJS, ES6).
- **`strict`**: Enables strict type-checking options.
- **`esModuleInterop`**: Allows default imports from CommonJS modules.

You can view the full configuration by looking into the `src/tsconfig/index.json` file in this package.
