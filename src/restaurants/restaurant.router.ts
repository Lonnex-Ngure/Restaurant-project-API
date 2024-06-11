import { Hono } from "hono";
import {
  listRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} from "./restaurant.controller";
import { zValidator } from "@hono/zod-validator";
import { restaurantschema } from "../validators";

export const restaurantRouter = new Hono();

restaurantRouter.get("/restaurants", listRestaurants);
restaurantRouter.get("/restaurants/:id", getRestaurantById);
restaurantRouter.post(
  "/restaurants",
  zValidator("json", restaurantschema),
  createRestaurant
);
restaurantRouter.put(
  "/restaurants/:id",
  zValidator("json", restaurantschema),
  updateRestaurant
);
restaurantRouter.delete("/restaurants/:id", deleteRestaurant);
