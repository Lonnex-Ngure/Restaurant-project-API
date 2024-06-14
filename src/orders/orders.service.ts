import db from "../drizzle/db";
import { ordersTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export const ordersService = {
  listOrders: async () => {
    return await db.query.ordersTable.findMany({
      columns: {
        id: true,
        delivery_address_id: true,
        driver_id: true,
        final_price: true,
      },
      with: {
        deliveryAddress: {
          columns: {
            id: true,
            street_address_1: true,
            street_address_2: true,
            zip_code: true,
          },
        },
        driver: {
          columns: {
            id: true,
            car_make: true,
            car_model: true,
            car_year: true,
          },
        },
      },
    });
  },
  getOrderById: async (id: number) => {
    return await db.query.ordersTable.findFirst({
      columns: {
        id: true,
        delivery_address_id: true,
        driver_id: true,
        final_price: true,
      },
      where: (ordersTable) => eq(ordersTable.id, id),
      with: {
        deliveryAddress: {
          columns: {
            id: true,
            street_address_1: true,
            street_address_2: true,
            zip_code: true,
          },
        },
        driver: {
          columns: {
            id: true,
            car_make: true,
            car_model: true,
            car_year: true,
          },
        },
      },
    });
  },
  create: async (order: any) => {
    return await db
      .insert(ordersTable)
      .values(order)
      .returning()
      .execute();
  },
  update: async (id: number, order: any) => {
    return await db
      .update(ordersTable)
      .set(order)
      .where(eq(ordersTable.id, id))
      .returning()
      .execute();
  },
  delete: async (id: number) => {
    return await db
      .delete(ordersTable)
      .where(eq(ordersTable.id, id))
      .execute();
  },
};
