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

export const ordersRouter = new Hono();

ordersRouter.get("/orders", listOrders);
ordersRouter.get("/orders/:id", getOrderById);
ordersRouter.post("/orders", zValidator("json", ordersSchema), createOrder);
ordersRouter.put("/orders/:id", zValidator("json", ordersSchema), updateOrder);
ordersRouter.delete("/orders/:id", deleteOrder);
