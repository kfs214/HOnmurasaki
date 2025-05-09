import { test, expect } from '@playwright/test';

// General Rendering and Responsiveness tests

test.describe('General Rendering and Responsiveness', () => {
  test('should render the app and display all initial elements', async ({ page }) => {
    await page.goto('/');
    const priceInputs = page.getByRole('textbox', { name: 'Price' });
    const quantityInputs = page.getByRole('textbox', { name: 'Quantity' });
    const countInputs = page.getByRole('textbox', { name: 'Count' });
    const addRowButton = page.getByRole('button', { name: 'Add Row' });

    await expect(priceInputs).toHaveCount(2);
    await expect(quantityInputs).toHaveCount(2);
    await expect(countInputs).toHaveCount(2);
    await expect(addRowButton).toBeVisible();
  });

  test('should adjust layout correctly for different screen sizes', async ({ page }) => {
    await page.goto('/');
    await page.setViewportSize({ width: 375, height: 812 }); // Mobile
    await expect(page).toHaveScreenshot('mobile-layout.png');

    await page.setViewportSize({ width: 1280, height: 720 }); // Desktop
    await expect(page).toHaveScreenshot('desktop-layout.png');
  });
});
