const texts = await page.locator('.foo').evaluateAll(els => els.map(el => el.textContent));
