import { expect, Locator, Page } from '@playwright/test';

export class CartPage {
  private readonly pageTitle: Locator;
  private readonly checkoutButton: Locator;

  constructor(private readonly page: Page) {
    this.pageTitle = page.getByTestId('title');
    this.checkoutButton = page.getByTestId('checkout');
  }

  private cartItem(productName: string): Locator {
    return this.page.locator('.cart_item').filter({ hasText: productName });
  }

  async verifyCartPage(): Promise<void> {
    await expect(this.pageTitle).toHaveText('Your Cart');
  }

  async verifyProductInCart(productName: string): Promise<void> {
    await expect(this.cartItem(productName)).toBeVisible();
  }

  async verifyCartItemCount(count: number): Promise<void> {
    await expect(this.page.locator('.cart_item')).toHaveCount(count);
  }

  async removeProduct(productName: string): Promise<void> {
    await this.cartItem(productName)
      .getByRole('button', { name: /remove/i })
      .click();
  }

  async proceedToCheckout(): Promise<void> {
    await this.checkoutButton.click();
  }
}