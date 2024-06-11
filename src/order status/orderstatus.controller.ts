import { Context } from "hono";
import { orderStatusService } from "./orderstatus.service";

export const listOrderStatuses = async (c: Context) => {
  const data = await orderStatusService.list();
  if (!data || data.length === 0) {
    return c.text("No order statuses found", 404);
  }
  return c.json(data, 200);
};

export const getOrderStatusById = async (c: Context) => {
  const id = c.req.param("id");
  const data = await orderStatusService.getById(Number(id));
  if (!data) {
    return c.text("Order status not found", 404);
  }
  return c.json(data, 200);
};

export const createOrderStatus = async (c: Context) => {
  const orderStatus = await c.req.json();
  const newOrderStatus = await orderStatusService.create(orderStatus);
  return c.json(newOrderStatus, 201);
};

export const updateOrderStatus = async (c: Context) => {
  const id = c.req.param("id");
  const orderStatus = await c.req.json();
  const updatedOrderStatus = await orderStatusService.update(Number(id), orderStatus);
  if (!updatedOrderStatus) {
    return c.text("Order status not found", 404);
  }
  return c.json(updatedOrderStatus, 200);
};

export const deleteOrderStatus = async (c: Context) => {
  const id = c.req.param("id");
  const deleted = await orderStatusService.delete(Number(id));
  if (!deleted) {
    return c.text("Order status not found", 404);
  }
  return c.text("Order status deleted", 200);
};
