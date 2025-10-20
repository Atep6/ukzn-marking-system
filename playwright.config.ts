import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests/e2e',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
  use: {
    headless: true,
    // baseURL is used so tests can call page.goto('/login')
    // Ensure your frontend server is running at this URL before running e2e tests
    baseURL: 'http://localhost:3000',
    viewport: { width: 1280, height: 720 },
    actionTimeout: 5 * 1000,
    trace: 'on-first-retry'
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } }
  ]
};

export default config;
