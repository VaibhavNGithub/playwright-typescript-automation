import { Page } from '@playwright/test';

export async function reloadPage(page: Page): Promise<void> {
  await page.reload();
}