import { test, expect, Page } from '@playwright/test';

async function assertInput({
  page,
  inputName,
  filledValue,
  expectedValue,
}: {
  page: Page;
  inputName: string;
  filledValue: string;
  expectedValue: string;
}) {
  const input = page.getByRole('textbox', { name: inputName }).first();
  await input.fill(filledValue);
  await expect(input).toHaveValue(expectedValue);
}

test.describe('Input Field Validations', () => {
  test.describe('Price Input', () => {
    test('accepts only numeric values', async ({ page }) => {
      await page.goto('/');
      await assertInput({ page, inputName: 'Price', filledValue: 'abc', expectedValue: '' });
      await assertInput({ page, inputName: 'Price', filledValue: '123', expectedValue: '123' });
    });

    test('formats values with thousand separators', async ({ page }) => {
      await page.goto('/');
      await assertInput({ page, inputName: 'Price', filledValue: '1000', expectedValue: '1,000' });
    });

    test('handles edge cases', async ({ page }) => {
      await page.goto('/');
      await assertInput({ page, inputName: 'Price', filledValue: '-1', expectedValue: '1' });
      await assertInput({ page, inputName: 'Price', filledValue: '0', expectedValue: '' });
    });
  });

  test.describe('Quantity Input', () => {
    test('accepts only numeric values', async ({ page }) => {
      await page.goto('/');
      await assertInput({ page, inputName: 'Quantity', filledValue: 'abc', expectedValue: '' });
      await assertInput({ page, inputName: 'Quantity', filledValue: '123', expectedValue: '123' });
    });

    test('formats values with thousand separators', async ({ page }) => {
      await page.goto('/');
      await assertInput({
        page,
        inputName: 'Quantity',
        filledValue: '1000',
        expectedValue: '1,000',
      });
    });

    test('handles edge cases', async ({ page }) => {
      await page.goto('/');
      await assertInput({ page, inputName: 'Quantity', filledValue: '-1', expectedValue: '1' });
      await assertInput({ page, inputName: 'Quantity', filledValue: '0', expectedValue: '' });
    });
  });

  test.describe('Count Input', () => {
    test('accepts only numeric values', async ({ page }) => {
      await page.goto('/');
      await assertInput({ page, inputName: 'Count', filledValue: 'abc', expectedValue: '' });
      await assertInput({ page, inputName: 'Count', filledValue: '123', expectedValue: '123' });
    });

    test('formats values with thousand separators', async ({ page }) => {
      await page.goto('/');
      await assertInput({ page, inputName: 'Count', filledValue: '1000', expectedValue: '1,000' });
    });

    test('handles edge cases', async ({ page }) => {
      await page.goto('/');
      await assertInput({ page, inputName: 'Count', filledValue: '-1', expectedValue: '1' });
      await assertInput({ page, inputName: 'Count', filledValue: '0', expectedValue: '' });
    });
  });
});

test.describe('Input Field Placeholders and Initial Values', () => {
  test('have correct placeholders and initial values', async ({ page }) => {
    await page.goto('/');

    const priceInput = page.getByRole('textbox', { name: 'Price' }).first();
    const quantityInput = page.getByRole('textbox', { name: 'Quantity' }).first();
    const countInput = page.getByRole('textbox', { name: 'Count' }).first();

    await expect(priceInput).toHaveAttribute('placeholder', 'Price');
    await expect(quantityInput).toHaveAttribute('placeholder', 'Quantity');
    await expect(countInput).toHaveAttribute('placeholder', '1');

    await expect(priceInput).toHaveValue('');
    await expect(quantityInput).toHaveValue('');
    await expect(countInput).toHaveValue('');
  });
});
