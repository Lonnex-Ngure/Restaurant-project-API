import db from "../drizzle/db";
import { ordermenuitemTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const ordermenuitemService = {
  list: async () => {
    return await db.select().from(ordermenuitemTable);
  },
  getById: async (id: number) => {
    return await db
      .select()
      .from(ordermenuitemTable)
      .where(eq(ordermenuitemTable.id, id))
      .execute();
  },
  create: async (ordermenuitem: any) => {
    return await db
      .insert(ordermenuitemTable)
      .values(ordermenuitem)
      .returning()
      .execute();
  },
  update: async (id: number, ordermenuitem: any) => {
    return await db
      .update(ordermenuitemTable)
      .set(ordermenuitem)
      .where(eq(ordermenuitemTable.id, id))
      .returning()
      .execute();
  },
  delete: async (id: number) => {
    return await db
      .delete(ordermenuitemTable)
      .where(eq(ordermenuitemTable.id, id))
      .execute();
  },
};
