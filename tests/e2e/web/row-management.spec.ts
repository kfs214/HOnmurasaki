import { test, expect, Page } from '@playwright/test';

import { getInputs, addRow } from './utils';

const getUnitPrices = (page: Page) => page.locator('text=Unit Price:');
const getInputRows = (page: Page) => page.getByTestId('input-row');

test.describe('Row Management and Calculations', () => {
  test('adds a new row when "Add Row" is clicked', async ({ page }) => {
    await page.goto('/');
    const { priceInputs } = getInputs(page);
    await expect(priceInputs).toHaveCount(2);
    await addRow(page);
    await expect(priceInputs).toHaveCount(3);
    await expect(priceInputs.last()).toBeFocused();
  });

  test('calculates unit price correctly for each row, including edge cases', async ({ page }) => {
    await page.goto('/');
    const { priceInputs, quantityInputs, countInputs } = getInputs(page);
    const unitPrices = getUnitPrices(page);

    // Row 1: 100 / (2 * 5) = 10
    await priceInputs.nth(0).fill('100');
    await quantityInputs.nth(0).fill('2');
    await countInputs.nth(0).fill('5');
    // Row 2: 10000 / (4 * 2) = 1250
    await priceInputs.nth(1).fill('10000');
    await quantityInputs.nth(1).fill('4');
    await countInputs.nth(1).fill('2');

    await expect(unitPrices.nth(0)).toContainText('10.00');
    await expect(unitPrices.nth(1)).toContainText('1,250.00');

    // Edge cases
    await addRow(page, 3);

    // Row 3: price = 0, 0 / (2 * 5) should show N/A
    await priceInputs.nth(2).fill('0');
    await quantityInputs.nth(2).fill('2');
    await countInputs.nth(2).fill('5');
    await expect(unitPrices.nth(2)).toContainText('N/A');

    // Row 4: quantity = 0 (treated as 1), 100 / (1 * 5) = 20
    await priceInputs.nth(3).fill('100');
    await quantityInputs.nth(3).fill('0');
    await countInputs.nth(3).fill('5');
    await expect(unitPrices.nth(3)).toContainText('20.00');

    // Row 5: count = 0 (treated as 1), 100 / (2 * 1) = 50
    await priceInputs.nth(4).fill('100');
    await quantityInputs.nth(4).fill('2');
    await countInputs.nth(4).fill('0');
    await expect(unitPrices.nth(4)).toContainText('50.00');
  });

  test('highlights the row with the minimum unit price', async ({ page }) => {
    await page.goto('/');
    const { priceInputs, quantityInputs } = getInputs(page);
    const inputRows = getInputRows(page);

    // Row 1: 100 / 5 = 20 (should get indicator)
    await priceInputs.nth(0).fill('100');
    await quantityInputs.nth(0).fill('5');
    // Row 2: 50 / 2 = 25
    await priceInputs.nth(1).fill('50');
    await quantityInputs.nth(1).fill('2');

    const starIconRow1 = inputRows.nth(0).getByText('⭐');
    const starIconRow2 = inputRows.nth(1).getByText('⭐');
    await expect(starIconRow1).toBeVisible();
    await expect(starIconRow2).toHaveCount(0);

    // Row 2: 30 / 2 = 15 (now row 2 should get indicator)
    await priceInputs.nth(1).fill('30');
    await expect(starIconRow2).toBeVisible();
    await expect(starIconRow1).toHaveCount(0);

    await expect(page.getByText('⭐')).toHaveCount(1);
  });

  test('shows indicators for all rows with the minimum unit price', async ({ page }) => {
    await page.goto('/');
    const { priceInputs, quantityInputs } = getInputs(page);
    const inputRows = getInputRows(page);

    // Row 1: 100 / 5 = 20 (should get indicator)
    await priceInputs.nth(0).fill('100');
    await quantityInputs.nth(0).fill('5');
    // Row 2: 40 / 2 = 20 (should get indicator)
    await priceInputs.nth(1).fill('40');
    await quantityInputs.nth(1).fill('2');
    await addRow(page);
    // Row 3: 60 / 2 = 30
    await priceInputs.nth(2).fill('60');
    await quantityInputs.nth(2).fill('2');

    const starIconRow1 = inputRows.nth(0).getByText('⭐');
    const starIconRow2 = inputRows.nth(1).getByText('⭐');
    const starIconRow3 = inputRows.nth(2).getByText('⭐');
    await expect(starIconRow1).toBeVisible();
    await expect(starIconRow2).toBeVisible();
    await expect(starIconRow3).toHaveCount(0);
    await expect(page.getByText('⭐')).toHaveCount(2);
  });

  test('scrolls to the last row when a new row is added', async ({ page }) => {
    await page.goto('/');
    await addRow(page, 10);
    const { priceInputs } = getInputs(page);
    await expect(priceInputs.last()).toBeVisible();
    await expect(priceInputs.last()).toBeInViewport();
    await expect(priceInputs.first()).not.toBeInViewport();
  });

  test('adds multiple rows correctly when "Add Row" is clicked rapidly', async ({ page }) => {
    await page.goto('/');
    const { priceInputs } = getInputs(page);
    await expect(priceInputs).toHaveCount(2);
    await Promise.all(
      Array(50)
        .fill(0)
        .map(() => page.click('text=Add Row'))
    );
    await expect(priceInputs).toHaveCount(52);
  });
});
