import { Context } from "hono";
import { stateService } from "./state.service";

export const listStates = async (c: Context) => {
  const data = await stateService.list();
  if (!data || data.length === 0) {
    return c.text("No states found", 404);
  }
  return c.json(data, 200);
};

export const getStateById = async (c: Context) => {
  const id = c.req.param("id");
  const data = await stateService.getById(Number(id));
  if (!data) {
    return c.text("State not found", 404);
  }
  return c.json(data, 200);
};

export const createState = async (c: Context) => {
  const state = await c.req.json();
  const newState = await stateService.create(state);
  return c.json(newState, 201);
};

export const updateState = async (c: Context) => {
  const id = c.req.param("id");
  const state = await c.req.json();
  const updatedState = await stateService.update(Number(id), state);
  if (!updatedState) {
    return c.text("State not found", 404);
  }
  return c.json(updatedState, 200);
};

export const deleteState = async (c: Context) => {
  const id = c.req.param("id");
  const deleted = await stateService.delete(Number(id));
  if (!deleted) {
    return c.text("State not found", 404);
  }
  return c.text("State deleted", 200);
};
