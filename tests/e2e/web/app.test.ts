import { test, expect } from '@playwright/test';

test('should render the app and display two price inputs', async ({ page }) => {
  // Navigate to the app
  await page.goto('/');

  // Locate input elements with the placeholder "Price"
  const priceInputs = page.getByRole('textbox', { name: 'Price' });

  // Assert that there are exactly two elements
  await expect(priceInputs).toHaveCount(2);
});

test('should add a new row when the "Add Row" button is clicked', async ({ page }) => {
  // Navigate to the app
  await page.goto('/');

  // Click the "Add Row" button
  await page.click('text=Add Row');

  // Assert that a new row is added
  const priceInputs = page.getByRole('textbox', { name: 'Price' });
  await expect(priceInputs).toHaveCount(3);
});
