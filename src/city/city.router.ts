import { Hono } from "hono";
import {
  listCities,
  getCityById,
  createCity,
  updateCity,
  deleteCity,
} from "./city.controller";
import { zValidator } from "@hono/zod-validator";
import { citySchema } from "../validators";
import { adminRoleAuth, userRoleAuth } from "../middleware/bearAuth"; // This should be the correct path to your middleware

export const cityRouter = new Hono();

cityRouter.get("/cities", userRoleAuth, listCities);
cityRouter.get("/cities/:id", userRoleAuth, getCityById);
cityRouter.post("/cities", adminRoleAuth, zValidator("json", citySchema), createCity);
cityRouter.put("/cities/:id", adminRoleAuth, zValidator("json", citySchema), updateCity);
cityRouter.delete("/cities/:id", adminRoleAuth, deleteCity);
