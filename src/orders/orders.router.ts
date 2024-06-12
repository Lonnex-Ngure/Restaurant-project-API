import { Hono } from "hono";
import {
  listOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "./orders.controller";
import { zValidator } from "@hono/zod-validator";
import { ordersSchema } from "../validators";
import { adminRoleAuth, userRoleAuth } from "../middleware/bearAuth";

export const ordersRouter = new Hono();

ordersRouter.get("/orders", adminRoleAuth, listOrders);
ordersRouter.get("/orders/:id", userRoleAuth, getOrderById);
ordersRouter.post("/orders", userRoleAuth, zValidator("json", ordersSchema), createOrder);
ordersRouter.put("/orders/:id", userRoleAuth, zValidator("json", ordersSchema), updateOrder);
ordersRouter.delete("/orders/:id", adminRoleAuth, deleteOrder);
