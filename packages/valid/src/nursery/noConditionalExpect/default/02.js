test("skip based on condition", async ({ page }) => {
    test.skip(someCondition, "Reason to skip");
    await expect(page).toHaveTitle("Title");
});
