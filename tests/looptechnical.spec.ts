import { test, expect } from '@playwright/test';

test('login automation', async ({ page }) => {
    await page.goto('https://animated-gingersnap-8cf7f2.netlify.app/');
    
    await page.getByRole('textbox', { name: 'Username' }).fill('admin');

    await page.getByRole('textbox', { name: 'Password' }).fill('password123');
  });