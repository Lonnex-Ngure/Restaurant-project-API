import { Hono } from "hono";
import {
  listOrderMenuItems,
  getOrderMenuItemById,
  createOrderMenuItem,
  updateOrderMenuItem,
  deleteOrderMenuItem,
} from "./ordermenuitem.controller";
import { zValidator } from "@hono/zod-validator";
import { ordermenuitemSchema } from "../validators";

export const ordermenuitemRouter = new Hono();

ordermenuitemRouter.get("/order_menu_items", listOrderMenuItems);
ordermenuitemRouter.get("/order_menu_items/:id", getOrderMenuItemById);
ordermenuitemRouter.post("/order_menu_items", zValidator("json", ordermenuitemSchema), createOrderMenuItem);
ordermenuitemRouter.put("/order_menu_items/:id", zValidator("json", ordermenuitemSchema), updateOrderMenuItem);
ordermenuitemRouter.delete("/order_menu_items/:id", deleteOrderMenuItem);
