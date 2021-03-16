module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/tests/**/*.test.(js|jsx|ts|tsx)'],
  setupFiles: ['<rootDir>/tests/setupTests.ts'],
};
