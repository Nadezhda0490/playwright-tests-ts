import { test, expect } from "@playwright/test";

test("Check new tab", async ({ page, context }) => {
  await page.goto("https://the-internet.herokuapp.com/windows");
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    page.click('a:has-text("Click Here")'),
  ]);
  
  await newPage.waitForLoadState();
  await expect(newPage.locator("h3")).toHaveText("New Window");
});
