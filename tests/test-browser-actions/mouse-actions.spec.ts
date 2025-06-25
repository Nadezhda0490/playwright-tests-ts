import { test, expect } from "@playwright/test";

test("Check mouse", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/hovers");
  const figure = page.locator(".figure").nth(2);
  const box = await figure.boundingBox();

  if (box) {
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.waitForTimeout(1000);
    const link = figure.locator('a:has-text("View profile")');
    await expect(link).toBeVisible();
  }
});
