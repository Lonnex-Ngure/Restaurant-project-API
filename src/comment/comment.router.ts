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

export const commentRouter = new Hono();

commentRouter.get("/comments", listComments);
commentRouter.get("/comments/:id", getCommentById);
commentRouter.post("/comments", zValidator("json", commentSchema), createComment);
commentRouter.put("/comments/:id", zValidator("json", commentSchema), updateComment);
commentRouter.delete("/comments/:id", deleteComment);
