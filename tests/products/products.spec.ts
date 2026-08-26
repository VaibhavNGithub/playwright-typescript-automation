import { test } from '../../fixtures/testFixtures';
import { getTestData } from '../../utils/excelUtils';

test('Customer can add a product to cart @smoke @regression', async ({
  productsPage,
  cartPage
}) => {
  const data = getTestData<{
    testCase: string;
    productName: string;
    quantity: number;
  }>('testData.xlsx', 'Products', 'TC001');

  await productsPage.open();

  await productsPage.verifyProductsPage();

  await productsPage.addProductToCart(data.productName);

  await productsPage.openCart();

  await cartPage.verifyCartPage();
  await cartPage.verifyProductInCart(data.productName);
  await cartPage.verifyCartItemCount(data.quantity);
});