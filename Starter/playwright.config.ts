// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { use } from 'express/lib/application';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  fullyParallel: true,
  workers: '75%',
  webServer: {
    command: 'npm start',
    url: 'http://localhost:3000/',
    reuseExistingServer: true
  },
  use: {
    baseURL: 'http://localhost:3000/',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], },
      dependencies: [
        'auth-setup'
      ]
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox']},
    //   dependencies: [
    //     'auth-setup'
    //   ]
    // },
    {
      name: 'auth-setup',
      testMatch: 'tests/setup/Auth.setup.ts',
    }
  ]

});

