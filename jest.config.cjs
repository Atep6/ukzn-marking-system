module.exports = {
  rootDir: '.',
  roots: ['<rootDir>/tests/unit'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': [
      require.resolve('ts-jest'),
      {
        tsconfig: 'tsconfig.json',
        isolatedModules: false
      }
    ]
  },
  testMatch: ['**/tests/unit/**/*.test.ts', '**/tests/unit/**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/tests/e2e/'],
  transformIgnorePatterns: ['/node_modules/']
};
