import { test as setup } from '@playwright/test';
import fs from 'fs';
import { LoginPage } from '../pages/LoginPage';
import { getRequiredEnv } from '../config/environment';

const authFile = 'auth/user.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);

  const username = getRequiredEnv('TEST_USERNAME');
  const password = getRequiredEnv('TEST_PASSWORD');

  await loginPage.open();

  await loginPage.login(username, password);

  await loginPage.verifyLoginSuccessful();

  fs.mkdirSync('auth', { recursive: true });

  await page.context().storageState({
    path: authFile
  });
});