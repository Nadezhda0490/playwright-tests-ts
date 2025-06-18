import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

test.beforeEach(async ({ page }) => {
  await page.goto("");
  await page.fill("#user-name", process.env.USERNAME_TEST || "");
  await page.fill("#password", process.env.PASSWORD || "");
  await page.click("#login-button");
});

test.describe("Check Cart page", async () => {
  test("should open Cart page on cart badge click", async ({ page }) => {
    await page.context().tracing.start({ screenshots: true, snapshots: true });

    await page.click(".inventory_item:nth-of-type(2) .btn_primary");
    await page.click("#shopping_cart_container");

    await page.context().tracing.stop({ path: "trace.zip" });

    await expect(page).toHaveURL(/cart\.html/);
  });

  test("should display quantity 1 for the added product", async ({ page }) => {
    await page.click(".inventory_item:nth-of-type(4) .btn_primary");
    await page.click("#shopping_cart_container");
    const quantity = await page.locator(".cart_list > div:nth-child(3) .cart_quantity").textContent();

    expect(quantity).toBeDefined();
    expect(quantity?.trim()).toBe("1");
  });

  test("should display the Checkout button on the Cart page", async ({page,}) => {
    await page.click(".inventory_item:nth-of-type(6) .btn_primary");
    await page.click("#shopping_cart_container");
    const checkoutBtn = page.locator(".btn_action");

    await expect(page).toHaveScreenshot();
    await expect(checkoutBtn).toBeVisible();
    await expect(checkoutBtn).toHaveText("CHECKOUT");
    await expect(checkoutBtn).toHaveCSS("background-color", "rgb(226, 35, 26)");
    await expect(checkoutBtn).toHaveCSS("color", "rgb(255, 255, 255)");
    await expect(checkoutBtn).toBeEnabled();
  });

  test("should support removing items from the Cart page", async ({page,}) => {
    await page.click(".inventory_item:nth-of-type(4) .btn_primary");
    await page.click(".inventory_item:nth-of-type(1) .btn_primary");
    await page.click("#shopping_cart_container");

    const cartItems = page.locator(".cart_item");
    await expect(cartItems).toHaveCount(2);

    const removeBtn = page.locator(".cart_list .cart_item:nth-of-type(3) .btn_secondary");

    await expect(removeBtn).toBeVisible();
    await expect(removeBtn).toHaveText("REMOVE");

    await removeBtn.click();

    await expect(cartItems).toHaveCount(1);
  });
});