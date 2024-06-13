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
import { adminRoleAuth, userRoleAuth } from "../middleware/bearAuth";

export const orderStatusRouter = new Hono();

orderStatusRouter.get("/orderstatuses", userRoleAuth, listOrderStatuses);
orderStatusRouter.get("/orderstatuses/:id", userRoleAuth, getOrderStatusById);
orderStatusRouter.post("/orderstatuses", adminRoleAuth, zValidator("json", orderStatusSchema), createOrderStatus);
orderStatusRouter.put("/orderstatuses/:id", adminRoleAuth, zValidator("json", orderStatusSchema), updateOrderStatus);
orderStatusRouter.delete("/orderstatuses/:id", adminRoleAuth, deleteOrderStatus);
