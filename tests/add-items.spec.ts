import { test as base } from "@playwright/test";

const test = base.extend<{ testIdGenerator: number }>({
  testIdGenerator: async ({}, use) => {
    const generatedId = Math.floor(Math.random() * 1000);
    await use(generatedId);
  },
});

test.only("should add random ID to item", async ({ page, testIdGenerator }) => {
  await page.goto("/inventory.html");
  const id = testIdGenerator;
  await page.click(".inventory_item .btn_primary");

  console.log(`Added item with test ID: ${id}`);
});
