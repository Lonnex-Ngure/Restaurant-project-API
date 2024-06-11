import db from "../drizzle/db";
import { driverTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const driverService = {
  list: async () => {
    return await db.select().from(driverTable);
  },
  getById: async (id: number) => {
    return await db
      .select()
      .from(driverTable)
      .where(eq(driverTable.id, id))
      .execute();
  },
  create: async (driver: any) => {
    return await db
      .insert(driverTable)
      .values(driver)
      .returning()
      .execute();
  },
  update: async (id: number, driver: any) => {
    return await db
      .update(driverTable)
      .set(driver)
      .where(eq(driverTable.id, id))
      .returning()
      .execute();
  },
  delete: async (id: number) => {
    return await db
      .delete(driverTable)
      .where(eq(driverTable.id, id))
      .execute();
  },
};
