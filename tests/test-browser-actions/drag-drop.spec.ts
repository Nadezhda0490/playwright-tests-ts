import { test, expect } from "@playwright/test";

test("Check drag and drop", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/drag_and_drop");
  await page.dragAndDrop("#column-b", "#column-a");
  const text = await page.locator("#column-b header").textContent();

  expect(text?.trim()).toBe("A");
});
