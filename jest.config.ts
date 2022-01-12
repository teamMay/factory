module.exports = {
  clearMocks: true,
  maxWorkers: 1,
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.(integration|test).ts'],
  setupFilesAfterEnv: ['./__tests__/setup/jest.setup.ts'],
  coveragePathIgnorePatterns: ['./node_modules', './__tests__'],
  collectCoverage: true,
};
