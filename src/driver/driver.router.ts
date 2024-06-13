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
import { adminRoleAuth, userRoleAuth } from "../middleware/bearAuth";  // import the auth middleware

export const driverRouter = new Hono();

driverRouter.get("/drivers", userRoleAuth, listDrivers);
driverRouter.get("/drivers/:id", userRoleAuth, getDriverById);
driverRouter.post("/drivers", adminRoleAuth, zValidator("json", driverSchema), createDriver);
driverRouter.put("/drivers/:id", adminRoleAuth, zValidator("json", driverSchema), updateDriver);
driverRouter.delete("/drivers/:id", adminRoleAuth, deleteDriver);
