test("ternary expect", async ({ page }) => {
    someCondition ? await expect(page).toHaveTitle("Title") : null;
});
