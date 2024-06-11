import db from "../drizzle/db";
import { orderstatusTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const orderStatusService = {
  list: async () => {
    return await db.select().from(orderstatusTable);
  },
  getById: async (id: number) => {
    return await db
      .select()
      .from(orderstatusTable)
      .where(eq(orderstatusTable.id, id))
      .execute();
  },
  create: async (orderStatus: any) => {
    return await db
      .insert(orderstatusTable)
      .values(orderStatus)
      .returning()
      .execute();
  },
  update: async (id: number, orderStatus: any) => {
    return await db
      .update(orderstatusTable)
      .set(orderStatus)
      .where(eq(orderstatusTable.id, id))
      .returning()
      .execute();
  },
  delete: async (id: number) => {
    return await db
      .delete(orderstatusTable)
      .where(eq(orderstatusTable.id, id))
      .execute();
  },
};
