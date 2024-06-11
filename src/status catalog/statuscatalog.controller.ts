import { Context } from "hono";
import { statusCatalogService } from "./statuscatalog.service";

export const listStatusCatalogs = async (c: Context) => {
  const data = await statusCatalogService.list();
  if (!data || data.length === 0) {
    return c.text("No status catalogs found", 404);
  }
  return c.json(data, 200);
};

export const getStatusCatalogById = async (c: Context) => {
  const id = c.req.param("id");
  const data = await statusCatalogService.getById(Number(id));
  if (!data) {
    return c.text("Status catalog not found", 404);
  }
  return c.json(data, 200);
};

export const createStatusCatalog = async (c: Context) => {
  const statusCatalog = await c.req.json();
  const newStatusCatalog = await statusCatalogService.create(statusCatalog);
  return c.json(newStatusCatalog, 201);
};

export const updateStatusCatalog = async (c: Context) => {
  const id = c.req.param("id");
  const statusCatalog = await c.req.json();
  const updatedStatusCatalog = await statusCatalogService.update(Number(id), statusCatalog);
  if (!updatedStatusCatalog) {
    return c.text("Status catalog not found", 404);
  }
  return c.json(updatedStatusCatalog, 200);
};

export const deleteStatusCatalog = async (c: Context) => {
  const id = c.req.param("id");
  const deleted = await statusCatalogService.delete(Number(id));
  if (!deleted) {
    return c.text("Status catalog not found", 404);
  }
  return c.text("Status catalog deleted", 200);
};
