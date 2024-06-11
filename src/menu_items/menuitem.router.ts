import { Hono } from "hono";
import {
  listMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} from "./menuitem.controller";
import { zValidator } from "@hono/zod-validator";
import { menuitemSchema } from "../validators";

export const menuitemRouter = new Hono();

menuitemRouter.get("/menuitems", listMenuItems);
menuitemRouter.get("/menuitems/:id", getMenuItemById);
menuitemRouter.post("/menuitems", zValidator("json", menuitemSchema), createMenuItem);
menuitemRouter.put("/menuitems/:id", zValidator("json", menuitemSchema), updateMenuItem);
menuitemRouter.delete("/menuitems/:id", deleteMenuItem);
