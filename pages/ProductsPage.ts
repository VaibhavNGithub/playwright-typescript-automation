import { expect, Locator, Page } from '@playwright/test';

export class ProductsPage {
  private readonly pageTitle: Locator;
  private readonly shoppingCartLink: Locator;

  constructor(private readonly page: Page) {
    this.pageTitle = page.getByTestId('title');
    this.shoppingCartLink = page.getByTestId('shopping-cart-link');
  }

  private productCard(productName: string): Locator {
    return this.page
      .locator('.inventory_item')
      .filter({ hasText: productName });
  }

  private addButton(productName: string): Locator {
    return this.productCard(productName).getByRole('button', {
      name: /add to cart/i
    });
  }

  async open(): Promise<void> {
    await this.page.goto('/inventory.html');
  }

  async verifyProductsPage(): Promise<void> {
    await expect(this.pageTitle).toHaveText('Products');
  }

  async addProductToCart(productName: string): Promise<void> {
    await expect(this.productCard(productName)).toBeVisible();
    await this.addButton(productName).click();
  }

  async openProduct(productName: string): Promise<void> {
    await this.productCard(productName)
      .getByText(productName, { exact: true })
      .click();
  }

  async openCart(): Promise<void> {
    await this.shoppingCartLink.click();
  }
}