import { Hono } from "hono";
import {
  listComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
} from "./comment.controller";
import { zValidator } from "@hono/zod-validator";
import { commentSchema } from "../validators";
import { adminRoleAuth, userRoleAuth } from "../middleware/bearAuth";

export const commentRouter = new Hono();

commentRouter.get("/comments", adminRoleAuth, listComments);
commentRouter.get("/comments/:id", adminRoleAuth, getCommentById);
commentRouter.post("/comments", userRoleAuth, zValidator("json", commentSchema), createComment);
commentRouter.put("/comments/:id", userRoleAuth, zValidator("json", commentSchema), updateComment);
commentRouter.delete("/comments/:id", userRoleAuth, deleteComment);
