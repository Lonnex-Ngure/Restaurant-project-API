import { Context } from "hono";
import { restaurantownerService } from "./restaurantowner.service";

export const listRestaurantOwners = async (c: Context) => {
  const data = await restaurantownerService.list();
  if (!data || data.length === 0) {
    return c.text("No restaurant owners found", 404);
  }
  return c.json(data, 200);
};

export const getRestaurantOwnerById = async (c: Context) => {
  const id = c.req.param("id");
  const data = await restaurantownerService.getById(Number(id));
  if (!data) {
    return c.text("Restaurant owner not found", 404);
  }
  return c.json(data, 200);
};

export const createRestaurantOwner = async (c: Context) => {
  const restaurantowner = await c.req.json();
  const newRestaurantOwner = await restaurantownerService.create(restaurantowner);
  return c.json(newRestaurantOwner, 201);
};

export const updateRestaurantOwner = async (c: Context) => {
  const id = c.req.param("id");
  const restaurantowner = await c.req.json();
  const updatedRestaurantOwner = await restaurantownerService.update(Number(id), restaurantowner);
  if (!updatedRestaurantOwner) {
    return c.text("Restaurant owner not found", 404);
  }
  return c.json(updatedRestaurantOwner, 200);
};

export const deleteRestaurantOwner = async (c: Context) => {
  const id = c.req.param("id");
  const deleted = await restaurantownerService.delete(Number(id));
  if (!deleted) {
    return c.text("Restaurant owner not found", 404);
  }
  return c.text("Restaurant owner deleted", 200);
};
