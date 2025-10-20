import { test, expect } from '@playwright/test';

test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== 'passed') {
    const base = `test-artifacts/${testInfo.title.replace(/[^a-z0-9_-]/gi, '_')}_${Date.now()}`;
    await page.screenshot({ path: `${base}.png`, fullPage: true });
    const html = await page.content();
    require('fs').mkdirSync('test-artifacts', { recursive: true });
    require('fs').writeFileSync(`${base}.html`, html, 'utf8');
    console.log('Saved debug artifacts:', `${base}.png`, `${base}.html`);
  }
});
test.describe('E2E Flow Tests', () => {
    test('Student Login and Dashboard Access', async ({ page }) => {
        // use baseURL from playwright config
        await page.goto('/login');
        await page.waitForSelector('input[name="username"]', { timeout: 15000 });
        await page.fill('input[name="username"]', 'studentUser');
        await page.fill('input[name="password"]', 'studentPass');
        // wait for navigation triggered by the submit
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'load', timeout: 15000 }),
            page.click('button[type="submit"]'),
        ]);
        await expect(page.locator('h1')).toHaveText('Welcome to the Dashboard', { timeout: 15000 });
    });

    test('Tutor Login and Marking Access', async ({ page }) => {
        await page.goto('/login');
        await page.waitForSelector('input[name="username"]', { timeout: 15000 });
        await page.fill('input[name="username"]', 'tutorUser');
        await page.fill('input[name="password"]', 'tutorPass');
        await Promise.all([
            page.waitForNavigation({ waitUntil: 'load', timeout: 15000 }),
            page.click('button[type="submit"]'),
        ]);
        await expect(page.locator('h1')).toHaveText('Marking Scripts', { timeout: 15000 });
    });

    test('Offline Access and Synchronization', async ({ page }) => {
        await page.goto('/dashboard');
        await page.waitForSelector('button#sync', { timeout: 15000 });

        // Simulate offline mode more reliably by toggling navigator.onLine and dispatching the offline event
        await page.evaluate(() => {
            Object.defineProperty(navigator, 'onLine', { value: false, configurable: true });
            window.dispatchEvent(new Event('offline'));
        });
        await page.click('button#sync');
        await expect(page.locator('.sync-status')).toHaveText('Offline - Changes will sync when back online', { timeout: 10000 });

        // Simulate coming back online and dispatch the online event
        await page.evaluate(() => {
            Object.defineProperty(navigator, 'onLine', { value: true, configurable: true });
            window.dispatchEvent(new Event('online'));
        });
        await page.click('button#sync');
        await expect(page.locator('.sync-status')).toHaveText('Syncing...', { timeout: 10000 });
    });
});