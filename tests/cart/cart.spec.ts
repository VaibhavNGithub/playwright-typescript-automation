import { test } from '../../fixtures/testFixtures';
import { getTestData } from '../../utils/excelUtils';

test('Customer can remove product from cart @regression', async ({
  productsPage,
  cartPage
}) => {
  const data = getTestData<{
    testCase: string;
    productName: string;
    quantity: number;
  }>('testData.xlsx', 'Products', 'TC001');

  await productsPage.open();

  await productsPage.addProductToCart(data.productName);
  await productsPage.openCart();

  await cartPage.verifyProductInCart(data.productName);
  await cartPage.removeProduct(data.productName);
  await cartPage.verifyCartItemCount(0);
});