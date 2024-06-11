import db from "../drizzle/db";
import { commentTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const commentService = {
  list: async () => {
    return await db.select().from(commentTable);
  },
  getById: async (id: number) => {
    return await db
      .select()
      .from(commentTable)
      .where(eq(commentTable.id, id))
      .execute();
  },
  create: async (comment: any) => {
    return await db
      .insert(commentTable)
      .values(comment)
      .returning()
      .execute();
  },
  update: async (id: number, comment: any) => {
    return await db
      .update(commentTable)
      .set(comment)
      .where(eq(commentTable.id, id))
      .returning()
      .execute();
  },
  delete: async (id: number) => {
    return await db
      .delete(commentTable)
      .where(eq(commentTable.id, id))
      .execute();
  },
};
