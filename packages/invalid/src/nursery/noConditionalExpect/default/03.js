test("catch expect", async ({ page }) => {
    try {
        await page.click("button");
    } catch (e) {
        await expect(page).toHaveTitle("Title");
    }
});
