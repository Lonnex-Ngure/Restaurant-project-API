import db from "../drizzle/db";
import { ordersTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const ordersService = {
  list: async () => {
    return await db.select().from(ordersTable);
  },
  getById: async (id: number) => {
    return await db
      .select()
      .from(ordersTable)
      .where(eq(ordersTable.id, id))
      .execute();
  },
  create: async (order: any) => {
    return await db
      .insert(ordersTable)
      .values(order)
      .returning()
      .execute();
  },
  update: async (id: number, order: any) => {
    return await db
      .update(ordersTable)
      .set(order)
      .where(eq(ordersTable.id, id))
      .returning()
      .execute();
  },
  delete: async (id: number) => {
    return await db
      .delete(ordersTable)
      .where(eq(ordersTable.id, id))
      .execute();
  },
};
