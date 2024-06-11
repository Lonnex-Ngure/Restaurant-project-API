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

export const stateRouter = new Hono();

stateRouter.get("/states", listStates);
stateRouter.get("/states/:id", getStateById);
stateRouter.post("/states", zValidator("json", stateSchema), createState);
stateRouter.put("/states/:id", zValidator("json", stateSchema), updateState);
stateRouter.delete("/states/:id", deleteState);
