# TS Config Template

A simple npm package that provides a reusable `tsconfig.json` template for TypeScript projects on cashbound website projects.

## Installation

To install this package, use your preferred package manager:

### Using pnpm
```bash
pnpm add @cashbound-id/tsconfig -D
```

### Using npm
```bash
npm install @cashbound-id/tsconfig --save-dev
```

### Using yarn
```bash
yarn add @cashbound-id/tsconfig -D
```

## Usage

To use the `tsconfig.json` template from this package, extend it in your project's `tsconfig.json` file.

### Step 1: Create or update your `tsconfig.json`

In your project root, create a `tsconfig.json` file (if it doesn’t already exist) and extend the template provided by this package:

```json
{
  "extends": "@cashbound-id/tsconfig",
  "compilerOptions": {
    // You can override or add your own options here
  }
}
```

### Step 2: Customize

You can customize the `compilerOptions` or any other properties in your `tsconfig.json` to fit your project’s specific needs.

## Template Overview

This template provides a basic setup for TypeScript projects, including options like:

- **`target`**: Specifies the target JavaScript language version.
- **`module`**: Determines the module system (e.g., CommonJS, ES6).
- **`strict`**: Enables strict type-checking options.
- **`esModuleInterop`**: Allows default imports from CommonJS modules.

You can view the full configuration by looking into the `tsconfig.json` file in this package.