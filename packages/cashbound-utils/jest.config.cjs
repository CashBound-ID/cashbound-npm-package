const { jestConfig } = require('@cashbound-id/jest/jest.cjs');

module.exports = jestConfig({
  baseDir: __dirname,
  config: {
    moduleNameMapper: {
      '@/(.*)$': '<rootDir>/src/$1'
    },
    prettierPath: require.resolve('prettier-2'),
    setupFiles: [],
    setupFilesAfterEnv: ['<rootDir>/src/setup-test.ts']
  }
});