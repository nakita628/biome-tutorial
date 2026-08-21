test('example', async ({ page }) => {
    await page.click('button');
    await expect(page.locator('.result')).toBeVisible();
});
