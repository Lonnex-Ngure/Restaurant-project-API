// menuitem.controller.ts
import { Context } from "hono";
import { menuitemService } from "./menuitem.service";

export const listMenuItems = async (c: Context) => {
  const data = await menuitemService.list();
  if (!data || data.length === 0) {
    return c.text("No menu items found", 404);
  }
  return c.json(data, 200);
};

export const getMenuItemById = async (c: Context) => {
  const id = c.req.param("id");
  const data = await menuitemService.getById(Number(id));
  if (!data) {
    return c.text("Menu item not found", 404);
  }
  return c.json(data, 200);
};

export const createMenuItem = async (c: Context) => {
  const menuItem = await c.req.json();
  const newMenuItem = await menuitemService.create(menuItem);
  return c.json(newMenuItem, 201);
};

export const updateMenuItem = async (c: Context) => {
  const id = c.req.param("id");
  const menuItem = await c.req.json();
  const updatedMenuItem = await menuitemService.update(Number(id), menuItem);
  if (!updatedMenuItem) {
    return c.text("Menu item not found", 404);
  }
  return c.json(updatedMenuItem, 200);
};

export const deleteMenuItem = async (c: Context) => {
  const id = c.req.param("id");
  const deleted = await menuitemService.delete(Number(id));
  if (!deleted) {
    return c.text("Menu item not found", 404);
  }
  return c.text("Menu item deleted", 200);
};
