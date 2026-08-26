import { expect, Page } from '@playwright/test';

export class OrdersPage {
  constructor(private readonly page: Page) {}

  async verifyOrderConfirmationPage(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout-complete\.html/);
  }
}