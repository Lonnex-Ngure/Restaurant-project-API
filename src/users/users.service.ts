import db from "../drizzle/db";
import { usersTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const userService = {
  list: async () => {
    return await db.select().from(usersTable);
  },
  getById: async (id: number) => {
    return await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .execute();
  },
  create: async (user: any) => {
    return await db.insert(usersTable).values(user).returning().execute();
  },
  update: async (id: number, user: any) => {
    return await db
      .update(usersTable)
      .set(user)
      .where(eq(usersTable.id, id))
      .returning()
      .execute();
  },
  delete: async (id: number) => {
    return await db.delete(usersTable).where(eq(usersTable.id, id)).execute();
  },
};
