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
import { adminRoleAuth, userRoleAuth } from "../middleware/bearAuth";

export const restaurantRouter = new Hono();

restaurantRouter.get("/restaurants", adminRoleAuth, listRestaurants);
restaurantRouter.get("/restaurants/:id", userRoleAuth, getRestaurantById);
restaurantRouter.post(
  "/restaurants",
  adminRoleAuth,
  zValidator("json", restaurantschema),
  createRestaurant
);
restaurantRouter.put(
  "/restaurants/:id",
  adminRoleAuth,
  zValidator("json", restaurantschema),
  updateRestaurant
);
restaurantRouter.delete("/restaurants/:id", adminRoleAuth, deleteRestaurant);
