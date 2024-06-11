import db from "../drizzle/db";
import { restaurantownerTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const restaurantownerService = {
  list: async () => {
    return await db.select().from(restaurantownerTable);
  },
  getById: async (id: number) => {
    return await db
      .select()
      .from(restaurantownerTable)
      .where(eq(restaurantownerTable.id, id))
      .execute();
  },
  create: async (restaurantowner: any) => {
    return await db
      .insert(restaurantownerTable)
      .values(restaurantowner)
      .returning()
      .execute();
  },
  update: async (id: number, restaurantowner: any) => {
    return await db
      .update(restaurantownerTable)
      .set(restaurantowner)
      .where(eq(restaurantownerTable.id, id))
      .returning()
      .execute();
  },
  delete: async (id: number) => {
    return await db
      .delete(restaurantownerTable)
      .where(eq(restaurantownerTable.id, id))
      .execute();
  },
};
