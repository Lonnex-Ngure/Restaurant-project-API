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
import { adminRoleAuth, userRoleAuth } from "../middleware/bearAuth";

export const statusCatalogRouter = new Hono();

statusCatalogRouter.get("/statuscatalogs", userRoleAuth, listStatusCatalogs);
statusCatalogRouter.get("/statuscatalogs/:id", userRoleAuth, getStatusCatalogById);
statusCatalogRouter.post("/statuscatalogs", adminRoleAuth, zValidator("json", statusCatalogSchema), createStatusCatalog);
statusCatalogRouter.put("/statuscatalogs/:id", adminRoleAuth, zValidator("json", statusCatalogSchema), updateStatusCatalog);
statusCatalogRouter.delete("/statuscatalogs/:id", adminRoleAuth, deleteStatusCatalog);
