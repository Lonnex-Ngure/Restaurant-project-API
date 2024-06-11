import { Context } from "hono";
import { driverService } from "./driver.service";

export const listDrivers = async (c: Context) => {
  const data = await driverService.list();
  if (!data || data.length === 0) {
    return c.text("No drivers found", 404);
  }
  return c.json(data, 200);
};

export const getDriverById = async (c: Context) => {
  const id = c.req.param("id");
  const data = await driverService.getById(Number(id));
  if (!data) {
    return c.text("Driver not found", 404);
  }
  return c.json(data, 200);
};

export const createDriver = async (c: Context) => {
  const driver = await c.req.json();
  const newDriver = await driverService.create(driver);
  return c.json(newDriver, 201);
};

export const updateDriver = async (c: Context) => {
  const id = c.req.param("id");
  const driver = await c.req.json();
  const updatedDriver = await driverService.update(Number(id), driver);
  if (!updatedDriver) {
    return c.text("Driver not found", 404);
  }
  return c.json(updatedDriver, 200);
};

export const deleteDriver = async (c: Context) => {
  const id = c.req.param("id");
  const deleted = await driverService.delete(Number(id));
  if (!deleted) {
    return c.text("Driver not found", 404);
  }
  return c.text("Driver deleted", 200);
};
