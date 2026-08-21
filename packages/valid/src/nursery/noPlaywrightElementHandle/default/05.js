const buttons = page.locator('.btn');
await expect(buttons).toHaveCount(3);
