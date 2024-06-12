// menuitem.service.ts
import db from "../drizzle/db";
import { menuitemTable, ordermenuitemTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const menuitemService = {
  list: async () => {
    return await db
      .select()
      .from(menuitemTable)
      .leftJoin(ordermenuitemTable, eq(ordermenuitemTable.menu_item_id, menuitemTable.id))
      .execute();
  },
  getById: async (id: number) => {
    return await db
      .select()
      .from(menuitemTable)
      .leftJoin(ordermenuitemTable, eq(ordermenuitemTable.menu_item_id, menuitemTable.id))
      .where(eq(menuitemTable.id, id))
      .execute();
  },
  create: async (menuItem: any) => {
    return await db
      .insert(menuitemTable)
      .values(menuItem)
      .returning()
      .execute();
  },
  update: async (id: number, menuItem: any) => {
    return await db
      .update(menuitemTable)
      .set(menuItem)
      .where(eq(menuitemTable.id, id))
      .returning()
      .execute();
  },
  delete: async (id: number) => {
    return await db
      .delete(menuitemTable)
      .where(eq(menuitemTable.id, id))
      .execute();
  },
};
