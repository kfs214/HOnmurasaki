import { Page } from '@playwright/test';

export function getInputs(page: Page) {
  return {
    priceInputs: page.getByRole('textbox', { name: 'Price' }),
    quantityInputs: page.getByRole('textbox', { name: 'Quantity' }),
    countInputs: page.getByRole('textbox', { name: 'Count' }),
  };
}
