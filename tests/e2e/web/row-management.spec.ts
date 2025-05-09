import { test, expect } from '@playwright/test';

// Row Management and Calculations tests

test.describe('Row Management and Calculations', () => {
  test('should add a new row when the "Add Row" button is clicked', async ({ page }) => {
    await page.goto('/');
    const priceInputs = page.getByRole('textbox', { name: 'Price' });
    await expect(priceInputs).toHaveCount(2);
    await page.click('text=Add Row');
    await expect(priceInputs).toHaveCount(3);

    const lastPriceInput = priceInputs.last();
    await expect(lastPriceInput).toBeFocused();
  });

  test('should calculate the unit price correctly for each row, including edge cases', async ({
    page,
  }) => {
    await page.goto('/');

    // Define reusable locators
    const priceInputs = page.getByRole('textbox', { name: 'Price' });
    const quantityInputs = page.getByRole('textbox', { name: 'Quantity' });
    const countInputs = page.getByRole('textbox', { name: 'Count' });
    const unitPrices = page.locator('text=Unit Price:');

    // First row
    await priceInputs.nth(0).fill('100');
    await quantityInputs.nth(0).fill('2');
    await countInputs.nth(0).fill('5');

    // Second row
    await priceInputs.nth(1).fill('10000');
    await quantityInputs.nth(1).fill('4');
    await countInputs.nth(1).fill('2');

    await expect(unitPrices.nth(0)).toContainText('10.00'); // 100 / (2 * 5)
    await expect(unitPrices.nth(1)).toContainText('1,250.00'); // 10000 / (4 * 2)

    // Add rows for edge cases
    await page.click('text=Add Row');
    await page.click('text=Add Row');
    await page.click('text=Add Row');

    // Edge case: price = 0
    await priceInputs.nth(2).fill('0');
    await quantityInputs.nth(2).fill('2');
    await countInputs.nth(2).fill('5');
    await expect(unitPrices.nth(2)).toContainText('N/A'); // Invalid price

    // Edge case: quantity = 0 (treated as 1)
    await priceInputs.nth(3).fill('100');
    await quantityInputs.nth(3).fill('0'); // Treated as 1
    await countInputs.nth(3).fill('5');
    await expect(unitPrices.nth(3)).toContainText('20.00'); // 100 / (1 * 5)

    // Edge case: count = 0 (treated as 1)
    await priceInputs.nth(4).fill('100');
    await quantityInputs.nth(4).fill('2');
    await countInputs.nth(4).fill('0'); // Treated as 1
    await expect(unitPrices.nth(4)).toContainText('50.00'); // 100 / (2 * 1)
  });

  test('should highlight the row with the minimum unit price', async ({ page }) => {
    await page.goto('/');
    const priceInputs = page.getByRole('textbox', { name: 'Price' });
    const inputRows = page.getByTestId('input-row');

    await priceInputs.nth(0).fill('100');
    await priceInputs.nth(1).fill('50');
    const starIconRow1 = inputRows.nth(0).getByText('⭐');
    const starIconRow2 = inputRows.nth(1).getByText('⭐');
    await expect(starIconRow2).toBeVisible();
    await expect(starIconRow1).toHaveCount(0);

    await priceInputs.nth(0).fill('30');
    await expect(starIconRow1).toBeVisible();
    await expect(starIconRow2).toHaveCount(0);

    const allStarIcons = page.getByText('⭐');
    await expect(allStarIcons).toHaveCount(1);
  });

  test('should scroll to the last row when a new row is added', async ({ page }) => {
    await page.goto('/');

    for (let i = 0; i < 10; i++) {
      await page.click('text=Add Row');
    }

    const lastRow = page.getByRole('textbox', { name: 'Price' }).last();
    await expect(lastRow).toBeVisible();
    await expect(lastRow).toBeInViewport();

    // Assert that the first row is out of viewport
    const firstRow = page.getByRole('textbox', { name: 'Price' }).first();
    await expect(firstRow).not.toBeInViewport();
  });

  test('should add multiple rows correctly when "Add Row" is clicked rapidly', async ({ page }) => {
    await page.goto('/');
    const priceInputs = page.getByRole('textbox', { name: 'Price' });

    await expect(priceInputs).toHaveCount(2);

    // Simulate rapid clicking
    await Promise.all([
      page.click('text=Add Row'),
      page.click('text=Add Row'),
      page.click('text=Add Row'),
      page.click('text=Add Row'),
      page.click('text=Add Row'),
    ]);

    // Should have 7 rows: 2 initial + 5 added
    await expect(priceInputs).toHaveCount(7);
  });
});
