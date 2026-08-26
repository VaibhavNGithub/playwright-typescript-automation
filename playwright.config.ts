import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';
import { getBaseUrl } from './config/environment';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  timeout: 30_000,
  expect: { timeout: 10_000 },
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,

  use: {
    baseURL: getBaseUrl(),
    testIdAttribute: 'data-test',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    actionTimeout: 15_000,
    navigationTimeout: 30_000
  },

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['allure-playwright', { resultsDir: 'reports/allure-results' }]
  ],

  projects: [
  {
    name: 'setup',
    testMatch: /auth\.setup\.ts/
  },

  {
    name: 'chromium',
    use: {
      ...devices['Desktop Chrome'],
      storageState: 'auth/user.json'
    },
    dependencies: ['setup']
  }
]
});