// menuitem.router.ts
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
import { adminRoleAuth, userRoleAuth } from "../middleware/bearAuth";

export const menuitemRouter = new Hono();

menuitemRouter.get("/menuitems", userRoleAuth, listMenuItems);
menuitemRouter.get("/menuitems/:id", userRoleAuth, getMenuItemById);
menuitemRouter.post("/menuitems", adminRoleAuth, zValidator("json", menuitemSchema), createMenuItem);
menuitemRouter.put("/menuitems/:id", adminRoleAuth, zValidator("json", menuitemSchema), updateMenuItem);
menuitemRouter.delete("/menuitems/:id", adminRoleAuth, deleteMenuItem);
