import { Context } from "hono";
import { commentService } from "./comment.service";

export const listComments = async (c: Context) => {
  const data = await commentService.list();
  if (!data || data.length === 0) {
    return c.text("No comments found", 404);
  }
  return c.json(data, 200);
};

export const getCommentById = async (c: Context) => {
  const id = c.req.param("id");
  const data = await commentService.getById(Number(id));
  if (!data) {
    return c.text("Comment not found", 404);
  }
  return c.json(data, 200);
};

export const createComment = async (c: Context) => {
  const comment = await c.req.json();
  const newComment = await commentService.create(comment);
  return c.json(newComment, 201);
};

export const updateComment = async (c: Context) => {
  const id = c.req.param("id");
  const comment = await c.req.json();
  const updatedComment = await commentService.update(Number(id), comment);
  if (!updatedComment) {
    return c.text("Comment not found", 404);
  }
  return c.json(updatedComment, 200);
};

export const deleteComment = async (c: Context) => {
  const id = c.req.param("id");
  const deleted = await commentService.delete(Number(id));
  if (!deleted) {
    return c.text("Comment not found", 404);
  }
  return c.text("Comment deleted", 200);
};
