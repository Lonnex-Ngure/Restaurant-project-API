import { Hono } from "hono";
import {
  listStates,
  getStateById,
  createState,
  updateState,
  deleteState,
} from "./state.controller";
import { zValidator } from "@hono/zod-validator";
import { stateSchema } from "../validators";
import { userRoleAuth, adminRoleAuth } from "../middleware/bearAuth";

export const stateRouter = new Hono();

stateRouter.get("/states", userRoleAuth, listStates);
stateRouter.get("/states/:id", userRoleAuth, getStateById);
stateRouter.post("/states", adminRoleAuth, zValidator("json", stateSchema), createState);
stateRouter.put("/states/:id", adminRoleAuth, zValidator("json", stateSchema), updateState);
stateRouter.delete("/states/:id", adminRoleAuth, deleteState);
