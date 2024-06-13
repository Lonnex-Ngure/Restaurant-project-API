import db from "../drizzle/db";
import { orderstatusTable, statuscatalogTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const orderStatusService = {
  list: async () => {
    return await db
      .select({
        orderstatus: orderstatusTable,
        statuscatalog: statuscatalogTable
      })
      .from(orderstatusTable)
      .leftJoin(statuscatalogTable, eq(orderstatusTable.status_catalog_id, statuscatalogTable.id));
  },
  getById: async (id: number) => {
    return await db
      .select({
        orderstatus: orderstatusTable,
        statuscatalog: statuscatalogTable
      })
      .from(orderstatusTable)
      .leftJoin(statuscatalogTable, eq(orderstatusTable.status_catalog_id, statuscatalogTable.id))
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
