import { Context } from "hono";
import { cityService } from "./city.service";

export const listCities = async (c: Context) => {
  const data = await cityService.list();
  if (!data || data.length === 0) {
    return c.text("No cities found", 404);
  }
  return c.json(data, 200);
};

export const getCityById = async (c: Context) => {
  const id = c.req.param("id");
  const data = await cityService.getById(Number(id));
  if (!data) {
    return c.text("City not found", 404);
  }
  return c.json(data, 200);
};

export const createCity = async (c: Context) => {
  const city = await c.req.json();
  const newCity = await cityService.create(city);
  return c.json(newCity, 201);
};

export const updateCity = async (c: Context) => {
  const id = c.req.param("id");
  const city = await c.req.json();
  const updatedCity = await cityService.update(Number(id), city);
  if (!updatedCity) {
    return c.text("City not found", 404);
  }
  return c.json(updatedCity, 200);
};

export const deleteCity = async (c: Context) => {
  const id = c.req.param("id");
  const deleted = await cityService.delete(Number(id));
  if (!deleted) {
    return c.text("City not found", 404);
  }
  return c.text("City deleted", 200);
};
