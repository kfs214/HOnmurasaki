import { Page } from '@playwright/test';

export function getInputs(page: Page) {
  return {
    priceInputs: page.getByRole('textbox', { name: 'Price' }),
    quantityInputs: page.getByRole('textbox', { name: 'Quantity' }),
    countInputs: page.getByRole('textbox', { name: 'Count' }),
  };
}

export const addRow = async (page: Page, times = 1) => {
  for (let i = 0; i < times; i++) await page.click('text=Add Row');
};
