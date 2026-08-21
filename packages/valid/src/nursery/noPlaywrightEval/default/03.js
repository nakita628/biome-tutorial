const text = await page.locator('.foo').evaluate(el => el.textContent);
