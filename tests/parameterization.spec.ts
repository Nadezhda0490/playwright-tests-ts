import { test, expect } from "@playwright/test";
import { userData } from "./test-data/user-data";

test.describe("Page availability", async () => {
  for (const { testPage, pageKey, isLogout } of userData) {
    test(`should load ${testPage} and display site logo`, async ({ page }) => {
        
        if(isLogout) {
            await page.goto('/inventory.html');
            await page.click('.bm-burger-button')
            await page.click('#logout_sidebar_link')

            await expect(page).toHaveURL('https://www.saucedemo.com/')
        } else {
            if (!pageKey) throw new Error('pageKey is required for non-logout pages');
            await page.goto(pageKey);
            const logo = page.locator(".app_logo");

            await expect(page).toHaveURL(pageKey);
            await expect(logo).toBeVisible();
        }
    });
  }
});