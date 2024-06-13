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
import { userRoleAuth, adminRoleAuth } from "../middleware/bearAuth";

export const restaurantownerRouter = new Hono();

restaurantownerRouter.get("/restaurant_owners", userRoleAuth, listRestaurantOwners);
restaurantownerRouter.get("/restaurant_owners/:id", userRoleAuth, getRestaurantOwnerById);
restaurantownerRouter.post("/restaurant_owners", userRoleAuth, zValidator("json", restaurantownerSchema), createRestaurantOwner);
restaurantownerRouter.put("/restaurant_owners/:id", userRoleAuth, zValidator("json", restaurantownerSchema), updateRestaurantOwner);
restaurantownerRouter.delete("/restaurant_owners/:id", adminRoleAuth, deleteRestaurantOwner);
