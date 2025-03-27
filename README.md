## Cashbound NPM Package
This repository is a monorepo that contains all npm packages used for cashbound projects. It leverages pnpm workspaces for efficient package management and Rollup, SWC or webpack for building packages.

### Packages Structure
Our project structure is divided into two main directories: Packages and Pluggables. Here's how they are organized:

- **Packages**
  This directory contains npm packages that do not include any business logic. Examples include TypeScript configuration templates, ESLint configurations, and other general utilities

- **Pluggables**
  This directory stores npm packages that contain business logic. Be mindful when handling sensitive information such as secret tokens or personally identifiable information (PII) within these packages.

Below is an illustration of how we manage the Packages and Pluggables directories:

``` 
├─ packages        
│  ├─ packages-1   
│  ├─ packages-2   
│  └─ packages-3   
└─ pluggables      
   ├─ pluggbles-1  
   ├─ pluggbles-2  
   └─ pluggbles-3  
```

### Getting Started

#### Prerequisites
Ensure you have the following installed:
- Node.js >=20.x
- pnpm >=9.x

### Installation

Clone the repository and install dependencies:
```
git clone https://github.com/CashBound-ID/cashbound-npm-package.git
cd cashbound-npm-package
pnpm install
```

### Running the Build

Build a specific package:
```
pnpm --filter package-1 build
```

### Linting & Formatting

Run ESLint and Prettier across all packages:
```
pnpm --filter package-1 lint --format
```

🚀 Happy coding!

