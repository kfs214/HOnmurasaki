import { test, expect } from '@playwright/test';

import { getInputs, addRow } from './utils';

test.describe('Accessibility and Keyboard Navigation', () => {
  test('adds a new row when pressing Enter on any input of the last row', async ({ page }) => {
    await page.goto('/');

    const { priceInputs, quantityInputs, countInputs } = getInputs(page);

    // Verify initial state
    await expect(priceInputs).toHaveCount(2);

    // Enter on Price input of the last row
    await priceInputs.last().press('Enter');
    await expect(priceInputs).toHaveCount(3);

    // Enter on Quantity input of the new last row
    await quantityInputs.last().press('Enter');
    await expect(priceInputs).toHaveCount(4);

    // Enter on Count input of the new last row
    await countInputs.last().press('Enter');
    await expect(priceInputs).toHaveCount(5);

    // Focus moves to the new row's price input
    await expect(priceInputs.last()).toBeFocused();
  });

  test('navigates between fields with Tab key', async ({ page }) => {
    await page.goto('/');
    const { priceInputs, quantityInputs, countInputs } = getInputs(page);

    // Focus the first Price input
    await priceInputs.first().focus();
    await expect(priceInputs.first()).toBeFocused();

    // Tab to Quantity
    await page.keyboard.press('Tab');
    await expect(quantityInputs.first()).toBeFocused();

    // Tab to Count
    await page.keyboard.press('Tab');
    await expect(countInputs.first()).toBeFocused();

    // Tab to Price of the second row
    await page.keyboard.press('Tab');
    await expect(priceInputs.nth(1)).toBeFocused();
  });

  test('adds a new row when pressing Tab on the last field of the last row', async ({ page }) => {
    await page.goto('/');
    const { priceInputs, countInputs } = getInputs(page);
    await expect(priceInputs).toHaveCount(2);

    // Tab from the last Count input (last field of last row)
    await countInputs.last().press('Tab');
    await expect(priceInputs).toHaveCount(3);
    await expect(priceInputs.last()).toBeFocused();
  });

  test('navigates backwards with Shift+Tab without adding a new row', async ({ page }) => {
    await page.goto('/');
    const { quantityInputs, countInputs, priceInputs } = getInputs(page);
    await countInputs.last().press('Shift+Tab');
    await expect(quantityInputs.last()).toBeFocused();
    await expect(priceInputs).toHaveCount(2); // Still just 2 rows
  });

  test('ensures all interactive elements are accessible', async ({ page }) => {
    await page.goto('/');
    const addRowButton = page.getByRole('button', { name: 'Add Row' });
    await expect(addRowButton).toBeVisible();
    await expect(addRowButton).toHaveAttribute('aria-label', 'Add Row');

    const { priceInputs, quantityInputs, countInputs } = getInputs(page);
    await expect(priceInputs.first()).toHaveAttribute('aria-label', 'Price');
    await expect(quantityInputs.first()).toHaveAttribute('aria-label', 'Quantity');
    await expect(countInputs.first()).toHaveAttribute('aria-label', 'Count');
  });

  test('does not add a new row when pressing Enter in input fields not in the last row', async ({
    page,
  }) => {
    await page.goto('/');
    const { priceInputs, quantityInputs, countInputs } = getInputs(page);
    await addRow(page);
    await expect(priceInputs).toHaveCount(3);

    // Enter on Price input of the first row (not the last row)
    await priceInputs.first().press('Enter');
    await expect(priceInputs).toHaveCount(3);

    // Enter on Quantity input of the middle row (not the last row)
    await quantityInputs.nth(1).press('Enter');
    await expect(priceInputs).toHaveCount(3);

    // Enter on Count input of the middle row (not the last row)
    await countInputs.nth(1).press('Enter');
    await expect(priceInputs).toHaveCount(3);
  });

  test('has accessible cheapest indicator for screen readers', async ({ page }) => {
    await page.goto('/');
    const { priceInputs } = getInputs(page);
    await priceInputs.first().fill('100');
    await priceInputs.last().fill('50');
    const starIcon = page.getByText('⭐');
    await expect(starIcon).toBeVisible();
    await expect(starIcon).toHaveAttribute('aria-label', 'Cheapest');
    const hiddenText = page.getByText('Cheapest', { exact: true });
    await expect(hiddenText).toBeAttached();
    expect(await hiddenText.getAttribute('class')).toContain('sr-only');
  });
});
