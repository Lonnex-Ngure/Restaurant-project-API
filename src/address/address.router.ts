import { Hono } from "hono";
import {
  listAddresses,
  getAddressById,
  createAddress,
  updateAddress,
  deleteAddress,
} from "./address.controller";
import { zValidator } from "@hono/zod-validator";
import { addressSchema } from "../validators";
import { userRoleAuth, adminRoleAuth } from "../middleware/bearAuth";

export const addressRouter = new Hono();

addressRouter.get("/addresses", userRoleAuth, listAddresses);
addressRouter.get("/addresses/:id", userRoleAuth, getAddressById);
addressRouter.post("/addresses", userRoleAuth, zValidator("json", addressSchema), createAddress);
addressRouter.put("/addresses/:id", userRoleAuth, zValidator("json", addressSchema), updateAddress);
addressRouter.delete("/addresses/:id", adminRoleAuth, deleteAddress);
