test("no assertion", async ({ page }) => {
    await page.goto("/");
    await page.click("button");
});
