test("conditional expect", async ({ page }) => {
    if (someCondition) {
        await expect(page).toHaveTitle("Title");
    }
});
