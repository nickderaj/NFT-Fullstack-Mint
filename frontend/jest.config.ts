import nextJest from 'next/jest';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/styles/(.*)$': '<rootDir>/src/styles/$1',
    '^@/elements/(.*)$': '<rootDir>/src/elements/$1',
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/types/(.*)$': '<rootDir>/src/types/$1',
    '^@/helpers/(.*)$': '<rootDir>/src/helpers/$1',
    '^@/tests/(.*)$': '<rootDir>/src/tests/$1',
    '^@/redux/(.*)$': '<rootDir>/src/app/redux/$1',
    '^@/api/(.*)$': '<rootDir>/src/app/api/$1',
    '^@/constants/(.*)$': '<rootDir>/../shared/constants/$1',
    '^@/models/(.*)$': '<rootDir>/../shared/models/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
