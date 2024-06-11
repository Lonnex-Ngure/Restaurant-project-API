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

export const categoryRouter = new Hono();

categoryRouter.get("/categories", listCategories);
categoryRouter.get("/categories/:id", getCategoryById);
categoryRouter.post("/categories", zValidator("json", categorySchema), createCategory);
categoryRouter.put("/categories/:id", zValidator("json", categorySchema), updateCategory);
categoryRouter.delete("/categories/:id", deleteCategory);
