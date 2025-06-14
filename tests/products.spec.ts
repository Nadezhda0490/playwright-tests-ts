import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

test.beforeEach(async ({ page }) => {
  await page.goto("");
  await page.fill("#user-name", process.env.USERNAME_TEST || "");
  await page.fill("#password", process.env.PASSWORD || "");
  await page.click("#login-button");

  await expect(page).toHaveURL(/inventory\.html/);
});

test.describe("Products page", async () => {
  test("should display product detail page when item is selected", async ({
    page,
  }) => {
    await page.click("#item_4_title_link");

    await expect(page).toHaveURL(/inventory-item\.html\?id=4/);
  });

  test("should return to the Products page when clicking the Back button", async ({
    page,
  }) => {
    await page.click("#item_4_title_link");
    await page.click(".inventory_details_back_button");

    await expect(page).toHaveURL(/inventory\.html/);
  });

  test("should add product to cart from detail page", async ({ page }) => {
    await page.click("#item_4_title_link");
    await page.click(".btn_primary");
    const updatedButton = page.locator(".btn_secondary");

    await expect(updatedButton).toHaveText("REMOVE");
  });

  test("should open menu when clicking the burger button", async ({ page }) => {
    await page.click(".bm-burger-button");

    await expect(page.locator(".bm-item-list")).toBeVisible();
    await expect(page.locator("#inventory_sidebar_link")).toBeVisible();
    await expect(page.locator("#inventory_sidebar_link")).toHaveText(
      "All Items"
    );
    await expect(page.locator("#about_sidebar_link")).toBeVisible();
    await expect(page.locator("#about_sidebar_link")).toHaveText("About");
    await expect(page.locator("#logout_sidebar_link")).toBeVisible();
    await expect(page.locator("#logout_sidebar_link")).toHaveText("Logout");
    await expect(page.locator("#reset_sidebar_link")).toBeVisible();
    await expect(page.locator("#reset_sidebar_link")).toHaveText(
      "Reset App State"
    );
  });
});