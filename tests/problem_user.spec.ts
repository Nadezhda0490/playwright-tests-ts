import { test, expect } from "@playwright/test";

test.describe("Problem user behavior", async () => {
  test("should have empty cart after logging in @problem", async ({ page }) => {
    await page.goto("/inventory.html");
    const cartBadge = page.locator(".shopping_cart_badge");

    await expect(cartBadge).toHaveCount(0);
  });

  test.skip("should keep item in cart after clicking Remove", async ({ page }) => {
    await page.goto("/inventory.html");
    await page.click(".inventory_item:nth-of-type(1) .btn_primary");
    const cartBadge = page.locator(".shopping_cart_badge");
    const removeBtn = page.locator(".inventory_item:nth-of-type(1) .btn_secondary");
    await removeBtn.click();

    await expect(cartBadge).toHaveCount(1);
    await expect(removeBtn).toHaveText("Remove");
  });
});
