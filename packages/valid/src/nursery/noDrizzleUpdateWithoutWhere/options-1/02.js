await db.update(users).set({ name: "John" }).where(eq(users.id, 1));
