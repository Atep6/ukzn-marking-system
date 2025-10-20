module.exports = {
  rootDir: '.',
  roots: ['<rootDir>/tests/unit'],
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
  testMatch: ['**/tests/unit/**/*.test.ts', '**/tests/unit/**/*.spec.ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/tests/e2e/'],
  transformIgnorePatterns: ['/node_modules/'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      isolatedModules: false
    }
  }
};
