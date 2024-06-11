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

export const cityRouter = new Hono();

cityRouter.get("/cities", listCities);
cityRouter.get("/cities/:id", getCityById);
cityRouter.post("/cities", zValidator("json", citySchema), createCity);
cityRouter.put("/cities/:id", zValidator("json", citySchema), updateCity);
cityRouter.delete("/cities/:id", deleteCity);
