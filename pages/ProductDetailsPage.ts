import { expect, Locator, Page } from '@playwright/test';

export class ProductDetailsPage {
  private readonly productName: Locator;
  private readonly backButton: Locator;
  private readonly addButton: Locator;

  constructor(private readonly page: Page) {
    this.productName = page.getByTestId('inventory-item-name');
    this.backButton = page.getByTestId('back-to-products');
    this.addButton = page.getByRole('button', { name: /add to cart/i });
  }

  async verifyProduct(productName: string): Promise<void> {
    await expect(this.productName).toHaveText(productName);
  }

  async addToCart(): Promise<void> {
    await this.addButton.click();
  }

  async backToProducts(): Promise<void> {
    await this.backButton.click();
  }
}