import { Context } from "hono";
import { ordersService } from "./orders.service";

export const listOrders = async (c: Context) => {
  const data = await ordersService.list();
  if (!data || data.length === 0) {
    return c.text("No orders found", 404);
  }
  return c.json(data, 200);
};

export const getOrderById = async (c: Context) => {
  const id = c.req.param("id");
  const data = await ordersService.getById(Number(id));
  if (!data) {
    return c.text("Order not found", 404);
  }
  return c.json(data, 200);
};

export const createOrder = async (c: Context) => {
  const order = await c.req.json();
  const newOrder = await ordersService.create(order);
  return c.json(newOrder, 201);
};

export const updateOrder = async (c: Context) => {
  const id = c.req.param("id");
  const order = await c.req.json();
  const updatedOrder = await ordersService.update(Number(id), order);
  if (!updatedOrder) {
    return c.text("Order not found", 404);
  }
  return c.json(updatedOrder, 200);
};

export const deleteOrder = async (c: Context) => {
  const id = c.req.param("id");
  const deleted = await ordersService.delete(Number(id));
  if (!deleted) {
    return c.text("Order not found", 404);
  }
  return c.text("Order deleted", 200);
};
