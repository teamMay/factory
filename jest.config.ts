module.exports = {
  clearMocks: true,
  maxWorkers: 1,
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.(integration|test).ts'],
  setupFilesAfterEnv: ['./__tests__/setup/jest.setup.ts'],
  coveragePathIgnorePatterns: ['./node_modules', './__tests__'],
  collectCoverage: true,
  transformIgnorePatterns: [
    'node_modules/(?!(payload|@payloadcms|file-type|strtok3|peek-readable|token-types|@borewit|uint8array-extras|qs-esm|@libsql)/)',
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)?$': [
      '@swc/jest',
      {
        sourceMaps: true,
      },
    ],
  },
  moduleNameMapper: {
    '^@next/env$': '<rootDir>/__tests__/mocks/next-env.ts',
    '^prettier$': '<rootDir>/__tests__/mocks/prettier.ts',
  },
  testPathIgnorePatterns: ['/node_modules/', '/build/', '/dist/'],
  coverageProvider: 'v8',
};
