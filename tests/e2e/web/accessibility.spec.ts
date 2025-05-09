import { test, expect } from '@playwright/test';

test.describe('Accessibility and Keyboard Navigation', () => {
  test('should add a new row when pressing Enter on any input of the last row', async ({
    page,
  }) => {
    await page.goto('/');

    // Define reusable locators
    const priceInputs = page.getByRole('textbox', { name: 'Price' });
    const quantityInputs = page.getByRole('textbox', { name: 'Quantity' });
    const countInputs = page.getByRole('textbox', { name: 'Count' });

    // Verify initial state
    await expect(priceInputs).toHaveCount(2);

    // Test Enter on Price input of the last row
    const lastPriceInput = priceInputs.last();
    await lastPriceInput.focus();
    await lastPriceInput.press('Enter');

    // Verify a new row was added (now 3 rows)
    await expect(priceInputs).toHaveCount(3);

    // Test Enter on Quantity input of the new last row
    const lastQuantityInput = quantityInputs.last();
    await lastQuantityInput.focus();
    await lastQuantityInput.press('Enter');

    // Verify another row was added (now 4 rows)
    await expect(priceInputs).toHaveCount(4);

    // Test Enter on Count input of the new last row
    const lastCountInput = countInputs.last();
    await lastCountInput.focus();
    await lastCountInput.press('Enter');

    // Verify another row was added (now 5 rows)
    await expect(priceInputs).toHaveCount(5);

    // Verify focus moves to the new row's price input
    const newPriceInput = priceInputs.last();
    await expect(newPriceInput).toBeFocused();
  });

  test('should navigate between fields with Tab key', async ({ page }) => {
    await page.goto('/');

    // Focus the first Price input
    const priceInput = page.getByRole('textbox', { name: 'Price' }).first();
    await priceInput.focus();
    await expect(priceInput).toBeFocused();

    // Press Tab to move to Quantity
    await page.keyboard.press('Tab');
    const quantityInput = page.getByRole('textbox', { name: 'Quantity' }).first();
    await expect(quantityInput).toBeFocused();

    // Press Tab to move to Count
    await page.keyboard.press('Tab');
    const countInput = page.getByRole('textbox', { name: 'Count' }).first();
    await expect(countInput).toBeFocused();
  });

  test('should add a new row when pressing Tab on the last field of the last row', async ({
    page,
  }) => {
    await page.goto('/');

    // Verify initial state
    const initialPriceInputs = page.getByRole('textbox', { name: 'Price' });
    await expect(initialPriceInputs).toHaveCount(2);

    // Focus the last Count input (which is the last field of the last row)
    const lastCountInput = page.getByRole('textbox', { name: 'Count' }).last();
    await lastCountInput.focus();

    // Press Tab, should add a new row
    await page.keyboard.press('Tab');

    // Verify a new row was added
    const priceInputs = page.getByRole('textbox', { name: 'Price' });
    await expect(priceInputs).toHaveCount(3);

    // Verify focus moved to the new row's price input
    const newPriceInput = priceInputs.last();
    await expect(newPriceInput).toBeFocused();
  });

  test('should navigate backwards with Shift+Tab without adding a new row', async ({ page }) => {
    await page.goto('/');

    // Focus the last Count input
    const lastCountInput = page.getByRole('textbox', { name: 'Count' }).last();
    await lastCountInput.focus();

    // Press Shift+Tab to move backward
    await page.keyboard.press('Shift+Tab');

    // Should focus the last Quantity input
    const lastQuantityInput = page.getByRole('textbox', { name: 'Quantity' }).last();
    await expect(lastQuantityInput).toBeFocused();

    // Verify no new row was added
    const priceInputs = page.getByRole('textbox', { name: 'Price' });
    await expect(priceInputs).toHaveCount(2); // Still just 2 rows
  });

  test('should handle a large number of rows without performance issues', async ({ page }) => {
    await page.goto('/');
    for (let i = 0; i < 50; i++) {
      await page.click('text=Add Row');
    }
    const priceInputs = page.getByRole('textbox', { name: 'Price' });
    await expect(priceInputs).toHaveCount(52); // 2 initial rows + 50 added rows
  });

  test('should ensure all interactive elements are accessible', async ({ page }) => {
    await page.goto('/');
    const addRowButton = page.getByRole('button', { name: 'Add Row' });
    await expect(addRowButton).toBeVisible();
    await expect(addRowButton).toHaveAttribute('aria-label', 'Add Row');

    // Check only the first input field for aria-label using getByRole
    await expect(page.getByRole('textbox', { name: 'Price' }).first()).toHaveAttribute(
      'aria-label',
      'Price'
    );
    await expect(page.getByRole('textbox', { name: 'Quantity' }).first()).toHaveAttribute(
      'aria-label',
      'Quantity'
    );
    await expect(page.getByRole('textbox', { name: 'Count' }).first()).toHaveAttribute(
      'aria-label',
      'Count'
    );
  });

  test('should not add a new row when pressing Enter in input fields not in the last row', async ({
    page,
  }) => {
    await page.goto('/');

    // Define reusable locators
    const priceInputs = page.getByRole('textbox', { name: 'Price' });
    const quantityInputs = page.getByRole('textbox', { name: 'Quantity' });
    const countInputs = page.getByRole('textbox', { name: 'Count' });

    // Verify initial state
    await expect(priceInputs).toHaveCount(2);

    // Add an extra row so we can test with a middle row
    await page.click('text=Add Row');
    await expect(priceInputs).toHaveCount(3);

    // Test Enter on Price input of the first row (not the last row)
    const firstRowPriceInput = priceInputs.first();
    await firstRowPriceInput.focus();
    await firstRowPriceInput.press('Enter');

    // Verify no new row was added
    await expect(priceInputs).toHaveCount(3);

    // Test Enter on Quantity input of the middle row (not the last row)
    const middleRowQuantityInput = quantityInputs.nth(1);
    await middleRowQuantityInput.focus();
    await middleRowQuantityInput.press('Enter');

    // Verify no new row was added
    await expect(priceInputs).toHaveCount(3);

    // Test Enter on Count input of the middle row (not the last row)
    const middleRowCountInput = countInputs.nth(1);
    await middleRowCountInput.focus();
    await middleRowCountInput.press('Enter');

    // Verify no new row was added
    await expect(priceInputs).toHaveCount(3);
  });

  test('should have accessible cheapest indicator for screen readers', async ({ page }) => {
    await page.goto('/');

    const priceInputs = page.getByRole('textbox', { name: 'Price' });
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
