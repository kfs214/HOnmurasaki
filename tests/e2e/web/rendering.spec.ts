import { test, expect } from '@playwright/test';

import { getInputs } from './utils';

// General Rendering and Responsiveness tests

test.describe('General Rendering and Responsiveness', () => {
  test('should render the app and display all initial elements', async ({ page }) => {
    await page.goto('/');
    const { priceInputs, quantityInputs, countInputs } = getInputs(page);
    const addRowButton = page.getByRole('button', { name: 'Add Row' });

    await expect(priceInputs).toHaveCount(2);
    await expect(quantityInputs).toHaveCount(2);
    await expect(countInputs).toHaveCount(2);
    await expect(addRowButton).toBeVisible();
  });

  test('have correct placeholders and initial values', async ({ page }) => {
    await page.goto('/');

    const { priceInputs, quantityInputs, countInputs } = getInputs(page);

    const priceInput = priceInputs.first();
    const quantityInput = quantityInputs.first();
    const countInput = countInputs.first();

    await expect(priceInput).toHaveAttribute('placeholder', 'Price');
    await expect(quantityInput).toHaveAttribute('placeholder', 'Quantity');
    await expect(countInput).toHaveAttribute('placeholder', '1');

    await expect(priceInput).toHaveValue('');
    await expect(quantityInput).toHaveValue('');
    await expect(countInput).toHaveValue('');
  });

  test('should adjust layout correctly for different screen sizes', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 375, height: 812 }); // Mobile
    await expect(page).toHaveScreenshot('mobile-layout.png');

    await page.setViewportSize({ width: 1280, height: 720 }); // Desktop
    await expect(page).toHaveScreenshot('desktop-layout.png');
  });
});
