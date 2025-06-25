import { test, expect } from "@playwright/test";

test("Check uploading", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/upload");
  await page.setInputFiles("#file-upload", "tests/test-data/test.txt");
  
  await page.click("#file-submit");
  const uploaded = page.locator("#uploaded-files");

  await expect(uploaded).toHaveText("test.txt");
});
