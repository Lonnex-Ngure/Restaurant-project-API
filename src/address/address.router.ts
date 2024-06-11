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

export const addressRouter = new Hono();

addressRouter.get("/addresses", listAddresses);
addressRouter.get("/addresses/:id", getAddressById);
addressRouter.post("/addresses", zValidator("json", addressSchema), createAddress);
addressRouter.put("/addresses/:id", zValidator("json", addressSchema), updateAddress);
addressRouter.delete("/addresses/:id", deleteAddress);
