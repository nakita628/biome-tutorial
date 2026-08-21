it("soft assertion", async ({ page }) => {
    await page.goto("/");
    await expect.soft(page.locator("h1")).toBeVisible();
});
