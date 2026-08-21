test("has assertion", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Title");
});
