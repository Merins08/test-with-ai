const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  const textbox = page.getByRole('textbox', { name: 'What needs to be done?' });
  await textbox.click();
  await textbox.fill('test');
  await textbox.press('Enter');
  await page.getByRole('checkbox', { name: 'Toggle Todo' }).check();
  await page.getByRole('button', { name: 'Clear completed' }).click();
  await page.getByText('This is just a demo of TodoMVC for testing, not the real TodoMVC app. todos').press('Tab');
  await page.getByRole('link', { name: 'Remo H. Jansen' }).press('Tab');
  await page.getByRole('link', { name: 'TodoMVC', exact: true }).press('Tab');
  await textbox.click();
  await textbox.fill('ciao tesio');
  await textbox.press('Enter');
  await page.getByRole('checkbox', { name: 'Toggle Todo' }).check();
});
