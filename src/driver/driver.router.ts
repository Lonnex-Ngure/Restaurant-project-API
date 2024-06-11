import { Hono } from "hono";
import {
  listDrivers,
  getDriverById,
  createDriver,
  updateDriver,
  deleteDriver,
} from "./driver.controller";
import { zValidator } from "@hono/zod-validator";
import { driverSchema } from "../validators";

export const driverRouter = new Hono();

driverRouter.get("/drivers", listDrivers);
driverRouter.get("/drivers/:id", getDriverById);
driverRouter.post("/drivers", zValidator("json", driverSchema), createDriver);
driverRouter.put("/drivers/:id", zValidator("json", driverSchema), updateDriver);
driverRouter.delete("/drivers/:id", deleteDriver);
