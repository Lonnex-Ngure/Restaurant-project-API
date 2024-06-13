import db from "../drizzle/db";
import { categoryTable, menuitemTable, restaurantTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const categoryService = {
  list: async () => {
    return await db
      .select({
        category: categoryTable,
        menuitem: menuitemTable,
        restaurant: restaurantTable,
      })
      .from(categoryTable)
      .leftJoin(menuitemTable, eq(menuitemTable.category_id, categoryTable.id))
      .leftJoin(restaurantTable, eq(restaurantTable.id, menuitemTable.restaurant_id));
  },
  getById: async (id: number) => {
    return await db
      .select({
        category: categoryTable,
        menuitem: menuitemTable,
        restaurant: restaurantTable,
      })
      .from(categoryTable)
      .leftJoin(menuitemTable, eq(menuitemTable.category_id, categoryTable.id))
      .leftJoin(restaurantTable, eq(restaurantTable.id, menuitemTable.restaurant_id))
      .where(eq(categoryTable.id, id))
      .execute();
  },
  create: async (category: any) => {
    return await db
      .insert(categoryTable)
      .values(category)
      .returning()
      .execute();
  },
  update: async (id: number, category: any) => {
    return await db
      .update(categoryTable)
      .set(category)
      .where(eq(categoryTable.id, id))
      .returning()
      .execute();
  },
  delete: async (id: number) => {
    return await db
      .delete(categoryTable)
      .where(eq(categoryTable.id, id))
      .execute();
  },
};
