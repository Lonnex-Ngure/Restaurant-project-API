import { Context } from "hono";
import { ordermenuitemService } from "./ordermenuitem.service";

export const listOrderMenuItems = async (c: Context) => {
  const data = await ordermenuitemService.list();
  if (!data || data.length === 0) {
    return c.text("No order menu items found", 404);
  }
  return c.json(data, 200);
};

export const getOrderMenuItemById = async (c: Context) => {
  const id = c.req.param("id");
  const data = await ordermenuitemService.getById(Number(id));
  if (!data) {
    return c.text("Order menu item not found", 404);
  }
  return c.json(data, 200);
};

export const createOrderMenuItem = async (c: Context) => {
  const ordermenuitem = await c.req.json();
  const newOrderMenuItem = await ordermenuitemService.create(ordermenuitem);
  return c.json(newOrderMenuItem, 201);
};

export const updateOrderMenuItem = async (c: Context) => {
  const id = c.req.param("id");
  const ordermenuitem = await c.req.json();
  const updatedOrderMenuItem = await ordermenuitemService.update(Number(id), ordermenuitem);
  if (!updatedOrderMenuItem) {
    return c.text("Order menu item not found", 404);
  }
  return c.json(updatedOrderMenuItem, 200);
};

export const deleteOrderMenuItem = async (c: Context) => {
  const id = c.req.param("id");
  const deleted = await ordermenuitemService.delete(Number(id));
  if (!deleted) {
    return c.text("Order menu item not found", 404);
  }
  return c.text("Order menu item deleted", 200);
};
