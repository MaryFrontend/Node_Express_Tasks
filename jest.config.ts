import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  setupFiles: ['dotenv/config'],
  testEnvironment: 'node',
  testPathIgnorePatterns: ['mocks.[jt]s'],
  testRegex: '/test/.*\\.(test|spec)?\\.(ts|tsx)$',
};

export default config;
