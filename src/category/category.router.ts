import { Hono } from "hono";
import {
  listCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from "./category.controller";
import { zValidator } from "@hono/zod-validator";
import { categorySchema } from "../validators";
import { adminRoleAuth, userRoleAuth } from "../middleware/bearAuth";

export const categoryRouter = new Hono();

categoryRouter.get("/categories", userRoleAuth, listCategories);
categoryRouter.get("/categories/:id", userRoleAuth, getCategoryById);
categoryRouter.post("/categories", adminRoleAuth, zValidator("json", categorySchema), createCategory);
categoryRouter.put("/categories/:id", adminRoleAuth, zValidator("json", categorySchema), updateCategory);
categoryRouter.delete("/categories/:id", adminRoleAuth, deleteCategory);
