import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

test.describe("Login page", async () => {
  test("should login with valid credentials", async ({ page }) => {
    await page.goto("");
    await page.fill("#user-name", process.env.USERNAME_TEST || "");
    await page.fill("#password", process.env.PASSWORD || "");
    await page.click("#login-button");

    await expect(page).toHaveURL(/inventory\.html/);
  });

  test("should not login with invalid credentials", async ({ page }) => {
    await page.goto("");
    await page.fill("#user-name", "invalid_user");
    await page.fill("#password", "55555");
    await page.click("#login-button");
    const errorLabel = page.locator('[data-test="error"]');

    await expect(errorLabel).toBeVisible();
    await expect(errorLabel).toContainText(
      "Username and password do not match any user in this service"
    );
  });

  test("should not login blocked user", async ({ page }) => {
    await page.goto("");
    await page.fill("#user-name", "locked_out_user");
    await page.fill("#password", process.env.PASSWORD || "");
    await page.click("#login-button");
    const errorLabel = page.locator('[data-test="error"]');

    await expect(errorLabel).toBeVisible();
    await expect(errorLabel).toContainText(
      "Sorry, this user has been locked out"
    );
  });
});