import { Hono } from "hono";
import {
  listOrderStatuses,
  getOrderStatusById,
  createOrderStatus,
  updateOrderStatus,
  deleteOrderStatus,
} from "./orderstatus.controller";
import { zValidator } from "@hono/zod-validator";
import { orderStatusSchema } from "../validators";

export const orderStatusRouter = new Hono();

orderStatusRouter.get("/orderstatuses", listOrderStatuses);
orderStatusRouter.get("/orderstatuses/:id", getOrderStatusById);
orderStatusRouter.post("/orderstatuses", zValidator("json", orderStatusSchema), createOrderStatus);
orderStatusRouter.put("/orderstatuses/:id", zValidator("json", orderStatusSchema), updateOrderStatus);
orderStatusRouter.delete("/orderstatuses/:id", deleteOrderStatus);
