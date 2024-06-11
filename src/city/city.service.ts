import db from "../drizzle/db";
import { cityTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const cityService = {
  list: async () => {
    return await db.select().from(cityTable);
  },
  getById: async (id: number) => {
    return await db
      .select()
      .from(cityTable)
      .where(eq(cityTable.id, id))
      .execute();
  },
  create: async (city: any) => {
    return await db
      .insert(cityTable)
      .values(city)
      .returning()
      .execute();
  },
  update: async (id: number, city: any) => {
    return await db
      .update(cityTable)
      .set(city)
      .where(eq(cityTable.id, id))
      .returning()
      .execute();
  },
  delete: async (id: number) => {
    return await db
      .delete(cityTable)
      .where(eq(cityTable.id, id))
      .execute();
  },
};
