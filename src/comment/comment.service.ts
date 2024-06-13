import db from "../drizzle/db";
import { commentTable, usersTable, ordersTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const commentService = {
  list: async () => {
    return await db
      .select({
        comment: commentTable,
        user: usersTable,
        order: ordersTable
      })
      .from(commentTable)
      .leftJoin(usersTable, eq(commentTable.user_id, usersTable.id))
      .leftJoin(ordersTable, eq(commentTable.order_id, ordersTable.id));
  },
  getById: async (id: number) => {
    return await db
      .select({
        comment: commentTable,
        user: usersTable,
        order: ordersTable
      })
      .from(commentTable)
      .leftJoin(usersTable, eq(commentTable.user_id, usersTable.id))
      .leftJoin(ordersTable, eq(commentTable.order_id, ordersTable.id))
      .where(eq(commentTable.id, id))
      .execute();
  },
  create: async (comment: any) => {
    return await db
      .insert(commentTable)
      .values(comment)
      .returning()
      .execute();
  },
  update: async (id: number, comment: any) => {
    return await db
      .update(commentTable)
      .set(comment)
      .where(eq(commentTable.id, id))
      .returning()
      .execute();
  },
  delete: async (id: number) => {
    return await db
      .delete(commentTable)
      .where(eq(commentTable.id, id))
      .execute();
  },
};
