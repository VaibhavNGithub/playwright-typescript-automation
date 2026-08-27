import { test } from '../../fixtures/testFixtures';
import { getTestData } from '../../utils/excelUtils';

test.describe('Login', () => {
  test('Valid user can login @smoke @sanity', async ({ loginPage }) => {
    const data = getTestData<{
      testCase: string;
      username: string;
      password: string;
      expectedError: string;
    }>('testData.xlsx', 'Login', 'TC001');

    await loginPage.open();
    await loginPage.login(data.username, data.password);
    await loginPage.verifyLoginSuccessful();
  });

  test('Locked user cannot login @regression @negative', async ({
    loginPage
  }) => {
    const data = getTestData<{
      testCase: string;
      username: string;
      password: string;
      expectedError: string;
    }>('testData.xlsx', 'Login', 'TC002');

    await loginPage.open();
    await loginPage.login(data.username, data.password);

    await loginPage.verifyLoginError(data.expectedError);
  });
});
// New Branch for pipeline validation