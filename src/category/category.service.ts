import db from "../drizzle/db";
import { categoryTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const categoryService = {
  list: async () => {
    return await db.select().from(categoryTable);
  },
  getById: async (id: number) => {
    return await db
      .select()
      .from(categoryTable)
      .where(eq(categoryTable.id, id))
      .execute();
  },
  create: async (category: any) => {
    return await db
      .insert(categoryTable)
      .values(category)
      .returning()
      .execute();
  },
  update: async (id: number, category: any) => {
    return await db
      .update(categoryTable)
      .set(category)
      .where(eq(categoryTable.id, id))
      .returning()
      .execute();
  },
  delete: async (id: number) => {
    return await db
      .delete(categoryTable)
      .where(eq(categoryTable.id, id))
      .execute();
  },
};
