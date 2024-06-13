import db from "../drizzle/db";
import { stateTable, cityTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const stateService = {
  list: async () => {
    return await db
      .select({
        state: stateTable,
        city: cityTable
      })
      .from(stateTable)
      .leftJoin(cityTable, eq(cityTable.state_id, stateTable.id));
  },
  getById: async (id: number) => {
    return await db
      .select({
        state: stateTable,
        city: cityTable
      })
      .from(stateTable)
      .leftJoin(cityTable, eq(cityTable.state_id, stateTable.id))
      .where(eq(stateTable.id, id))
      .execute();
  },
  create: async (state: any) => {
    return await db
      .insert(stateTable)
      .values(state)
      .returning()
      .execute();
  },
  update: async (id: number, state: any) => {
    return await db
      .update(stateTable)
      .set(state)
      .where(eq(stateTable.id, id))
      .returning()
      .execute();
  },
  delete: async (id: number) => {
    return await db
      .delete(stateTable)
      .where(eq(stateTable.id, id))
      .execute();
  },
};
