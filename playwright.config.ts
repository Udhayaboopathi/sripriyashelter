import { defineConfig, devices } from "@playwright/test";

const PORT = Number(process.env.E2E_PORT ?? 3200);
// Uses an installed Chrome/Chromium. Set CHROME_PATH or run `npx playwright install chromium`.
const executablePath = process.env.CHROME_PATH;

export default defineConfig({
  testDir: "./e2e",
  timeout: 45_000,
  fullyParallel: true,
  retries: 0,
  reporter: [["list"]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
    launchOptions: executablePath ? { executablePath } : undefined,
  },
  projects: [
    { name: "desktop", testIgnore: /responsive\.spec/, use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 900 } } },
    { name: "mobile", testIgnore: /(responsive|interactions)\.spec/, use: { ...devices["Pixel 7"], viewport: { width: 390, height: 844 } } },
    // Route × width matrix (320 → 3440); viewports are set per test.
    { name: "responsive", testMatch: /responsive\.spec/, use: { ...devices["Desktop Chrome"] } },
  ],
  webServer: {
    command: `npm run start -- -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
