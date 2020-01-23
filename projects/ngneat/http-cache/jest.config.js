module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setupJest.ts'],
  cacheDirectory: '<rootDir>/.cache',
  testMatch: ['<rootDir>/src/**/*.spec.ts'],
  testPathIgnorePatterns: ['node_modules'],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  modulePathIgnorePatterns: ['mocks.spec.ts']
};
