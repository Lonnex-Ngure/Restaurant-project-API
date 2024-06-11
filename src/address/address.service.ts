import db from "../drizzle/db";
import { addressTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const addressService = {
  list: async () => {
    return await db.select().from(addressTable);
  },
  getById: async (id: number) => {
    return await db
      .select()
      .from(addressTable)
      .where(eq(addressTable.id, id))
      .execute();
  },
  create: async (address: any) => {
    return await db
      .insert(addressTable)
      .values(address)
      .returning()
      .execute();
  },
  update: async (id: number, address: any) => {
    return await db
      .update(addressTable)
      .set(address)
      .where(eq(addressTable.id, id))
      .returning()
      .execute();
  },
  delete: async (id: number) => {
    return await db
      .delete(addressTable)
      .where(eq(addressTable.id, id))
      .execute();
  },
};
