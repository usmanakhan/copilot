import { test, expect as pwExpect } from '@playwright/test';

test('homepage has title', async ({ page }) => {
  await page.goto('http://127.0.0.1:5500/dist/'); // Replace with your dev server URL
  await pwExpect(page).toHaveTitle(/Website with AI/);
});