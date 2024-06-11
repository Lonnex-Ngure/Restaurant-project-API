import { Context } from "hono";
import { categoryService } from "./category.service";

export const listCategories = async (c: Context) => {
  const data = await categoryService.list();
  if (!data || data.length === 0) {
    return c.text("No categories found", 404);
  }
  return c.json(data, 200);
};

export const getCategoryById = async (c: Context) => {
  const id = c.req.param("id");
  const data = await categoryService.getById(Number(id));
  if (!data) {
    return c.text("Category not found", 404);
  }
  return c.json(data, 200);
};

export const createCategory = async (c: Context) => {
  const category = await c.req.json();
  const newCategory = await categoryService.create(category);
  return c.json(newCategory, 201);
};

export const updateCategory = async (c: Context) => {
  const id = c.req.param("id");
  const category = await c.req.json();
  const updatedCategory = await categoryService.update(Number(id), category);
  if (!updatedCategory) {
    return c.text("Category not found", 404);
  }
  return c.json(updatedCategory, 200);
};

export const deleteCategory = async (c: Context) => {
  const id = c.req.param("id");
  const deleted = await categoryService.delete(Number(id));
  if (!deleted) {
    return c.text("Category not found", 404);
  }
  return c.text("Category deleted", 200);
};
