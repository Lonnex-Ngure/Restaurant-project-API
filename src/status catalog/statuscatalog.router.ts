import { Hono } from "hono";
import {
  listStatusCatalogs,
  getStatusCatalogById,
  createStatusCatalog,
  updateStatusCatalog,
  deleteStatusCatalog,
} from "./statuscatalog.controller";
import { zValidator } from "@hono/zod-validator";
import { statusCatalogSchema } from "../validators";

export const statusCatalogRouter = new Hono();

statusCatalogRouter.get("/statuscatalogs", listStatusCatalogs);
statusCatalogRouter.get("/statuscatalogs/:id", getStatusCatalogById);
statusCatalogRouter.post("/statuscatalogs", zValidator("json", statusCatalogSchema), createStatusCatalog);
statusCatalogRouter.put("/statuscatalogs/:id", zValidator("json", statusCatalogSchema), updateStatusCatalog);
statusCatalogRouter.delete("/statuscatalogs/:id", deleteStatusCatalog);
