import { Hono } from "hono";
import {
  listRestaurantOwners,
  getRestaurantOwnerById,
  createRestaurantOwner,
  updateRestaurantOwner,
  deleteRestaurantOwner,
} from "./restaurantowner.controller";
import { zValidator } from "@hono/zod-validator";
import { restaurantownerSchema } from "../validators";

export const restaurantownerRouter = new Hono();

restaurantownerRouter.get("/restaurant_owners", listRestaurantOwners);
restaurantownerRouter.get("/restaurant_owners/:id", getRestaurantOwnerById);
restaurantownerRouter.post("/restaurant_owners", zValidator("json", restaurantownerSchema), createRestaurantOwner);
restaurantownerRouter.put("/restaurant_owners/:id", zValidator("json", restaurantownerSchema), updateRestaurantOwner);
restaurantownerRouter.delete("/restaurant_owners/:id", deleteRestaurantOwner);
