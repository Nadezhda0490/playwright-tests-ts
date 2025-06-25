import { test, expect } from "@playwright/test";

test("Check shadowDom", async ({ page }) => {
  await page.goto("https://books-pwakit.appspot.com/");
  const shadowElement = page.locator(".books-desc");

  await expect(shadowElement).toHaveText(
    "Search the world's most comprehensive index of full-text books.");
});
