import db from "../drizzle/db";
import { statuscatalogTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const statusCatalogService = {
  list: async () => {
    return await db.select().from(statuscatalogTable);
  },
  getById: async (id: number) => {
    return await db
      .select()
      .from(statuscatalogTable)
      .where(eq(statuscatalogTable.id, id))
      .execute();
  },
  create: async (statusCatalog: any) => {
    return await db
      .insert(statuscatalogTable)
      .values(statusCatalog)
      .returning()
      .execute();
  },
  update: async (id: number, statusCatalog: any) => {
    return await db
      .update(statuscatalogTable)
      .set(statusCatalog)
      .where(eq(statuscatalogTable.id, id))
      .returning()
      .execute();
  },
  delete: async (id: number) => {
    return await db
      .delete(statuscatalogTable)
      .where(eq(statuscatalogTable.id, id))
      .execute();
  },
};
