import db from "../drizzle/db";
import { cityTable, stateTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const cityService = {
  list: async () => {
    return await db
      .select()
      .from(cityTable)
      .leftJoin(stateTable, eq(cityTable.state_id, stateTable.id));
  },
  getById: async (id: number) => {
    const result = await db
      .select()
      .from(cityTable)
      .leftJoin(stateTable, eq(cityTable.state_id, stateTable.id))
      .where(eq(cityTable.id, id))
      .execute();
    return result[0];
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
