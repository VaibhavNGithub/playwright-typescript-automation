import { test } from '../../fixtures/testFixtures';
import { getTestData } from '../../utils/excelUtils';
import { generateCustomer } from '../../utils/randomDataUtils';

test('Order confirmation page is displayed @sanity @regression', async ({
  productsPage,
  cartPage,
  checkoutPage,
  ordersPage
}) => {
  const productData = getTestData<{
    testCase: string;
    productName: string;
    quantity: number;
  }>('testData.xlsx', 'Products', 'TC001');

  const customer = generateCustomer();

  await productsPage.open();

  await productsPage.addProductToCart(productData.productName);
  await productsPage.openCart();
  await cartPage.proceedToCheckout();

  await checkoutPage.enterCustomerDetails(
    customer.firstName,
    customer.lastName,
    customer.postalCode
  );

  await checkoutPage.continueToOverview();
  await checkoutPage.placeOrder();

  await ordersPage.verifyOrderConfirmationPage();
});