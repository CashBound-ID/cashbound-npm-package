# Compiler Package

This npm package offers a collection of shared compiler configurations. Currently, it supports Rollup and TypeScript (`tsconfig`).

## Installation

Install the package using your preferred package manager:

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

## Available Configurations

### Rollup Configuration
To use this configuration, first create a Rollup configuration file and import the provided setup from this package.

#### Step 1: Create or Update Your Rollup Config

In your project root, create a `rollup.config.cjs` file (if it doesn't already exist) and import the configuration:

```js
import { rollupConfig } from '@cashbound-id/compiler/rollup.cjs';

export default rollupConfig({ baseDir: __dirname });
```

#### Step 2: Customize Configuration

The method accepts several arguments that can be adjusted based on your requirements:

| Argument      | Example Value  | Description |
|--------------|--------------|-------------|
| `baseDir`       | `__dirname`   | Defines the base directory used when compiling JavaScript files. |
| `inputPlugins`  | `[]`          | Allows adding additional plugins to the input stage. See the Rollup documentation for details. |
| `outputPlugins` | `[]`          | Enables adding extra plugins to the output stage. Refer to the Rollup documentation for guidance. |
| `cjsConfig`     | `{}`          | Customizes the CommonJS plugin parameters. More details can be found in the `@rollup/plugin-commonjs` documentation. |

### TypeScript Configuration
To apply the `tsconfig.json` template from this package, extend it in your project's `tsconfig.json` file.

#### Step 1: Create or Update `tsconfig.json`

In your project root, create or modify `tsconfig.json` to extend the provided configuration:

```json
{
  "extends": "@cashbound-id/compiler/tsconfig.json",
  "compilerOptions": {
    // Customize or override options as needed
  }
}
```

#### Step 2: Customize Configuration

Modify the `compilerOptions` or other settings in your `tsconfig.json` to fit your project's needs.

#### Overview of Provided Template

This template includes essential TypeScript settings such as:

- **`target`**: Defines the output JavaScript version.
- **`module`**: Specifies the module system (e.g., CommonJS, ES6).
- **`strict`**: Enables strict type-checking.
- **`esModuleInterop`**: Supports default imports from CommonJS modules.

For a complete configuration reference, check the `src/tsconfig/index.json` file in this package.
