import db from "../drizzle/db";
import { usersTable, ordersTable, driverTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const userService = {
  list: async () => {
    return await db.query.usersTable.findMany({
      columns: {
        name: true,
        contact_phone: true,
        email: true,
      },
      with: {
        orders: {
          columns: {
            id: true,
            price: true,
            discount: true,
            final_price: true,
          },
          with: {
            driver: {
              columns: {
                id: true,
                car_make: true,
                car_model: true,
                car_year: true,
              },
            },
          },
        },
      },
    });
  },
  getById: async (id: number) => {
    return await db.query.usersTable.findFirst({
      columns: {
        name: true,
        contact_phone: true,
        email: true,
      },
      where: (usersTable) => eq(usersTable.id, id),
      with: {
        orders: {
          columns: {
            id: true,
            price: true,
            discount: true,
            final_price: true,
          },
          with: {
            driver: {
              columns: {
                id: true,
                car_make: true,
                car_model: true,
                car_year: true,
              },
            },
          },
        },
      },
    });
  },
  create: async (user: any) => {
    const result = await db.insert(usersTable).values(user)
      .returning({
        id: usersTable.id,
        name: usersTable.name,
        contact_phone: usersTable.contact_phone,
        email: usersTable.email,
      }).execute();
    return result[0];
  },
  update: async (id: number, user: any) => {
    const result = await db.update(usersTable).set(user)
      .where(eq(usersTable.id, id))
      .returning({
        id: usersTable.id,
        name: usersTable.name,
        contact_phone: usersTable.contact_phone,
        email: usersTable.email,
      }).execute();
    return result[0] || null;
  },
  delete: async (id: number) => {
    const result = await db.delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning({
        id: usersTable.id,
      }).execute();
    return result.length > 0;
  },
};
