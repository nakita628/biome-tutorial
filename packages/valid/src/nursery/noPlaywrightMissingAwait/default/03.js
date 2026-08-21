test('example', async ({ page }) => {
    await expect(page.getByRole('button')).toBeVisible();
});
