// users.router.ts
import { Hono } from "hono";
import {
  listUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "./users.controller";
import { zValidator } from "@hono/zod-validator";
import { userSchema } from "../validators";
import { adminRoleAuth, userRoleAuth } from "../middleware/bearAuth";

export const usersRouter = new Hono();

// Get all users - Accessible only to admins
usersRouter.get("/users", adminRoleAuth, listUsers);

// Get a single user - Accessible to all authenticated users
usersRouter.get("/users/:id", userRoleAuth, getUserById);

// Create a user - Accessible only to admins
usersRouter.post(
  "/users",
  adminRoleAuth,
  zValidator("json", userSchema),
  createUser
);

// Update a user - Accessible only to admins
usersRouter.put(
  "/users/:id",
  adminRoleAuth,
  zValidator("json", userSchema),
  updateUser
);

// Delete a user - Accessible only to admins
usersRouter.delete("/users/:id", adminRoleAuth, deleteUser);
