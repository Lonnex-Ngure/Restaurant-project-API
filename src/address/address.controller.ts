import { Context } from "hono";
import { addressService } from "./address.service";

export const listAddresses = async (c: Context) => {
  const data = await addressService.list();
  if (!data || data.length === 0) {
    return c.text("No addresses found", 404);
  }
  return c.json(data, 200);
};

export const getAddressById = async (c: Context) => {
  const id = c.req.param("id");
  const data = await addressService.getById(Number(id));
  if (!data) {
    return c.text("Address not found", 404);
  }
  return c.json(data, 200);
};

export const createAddress = async (c: Context) => {
  const address = await c.req.json();
  const newAddress = await addressService.create(address);
  return c.json(newAddress, 201);
};

export const updateAddress = async (c: Context) => {
  const id = c.req.param("id");
  const address = await c.req.json();
  const updatedAddress = await addressService.update(Number(id), address);
  if (!updatedAddress) {
    return c.text("Address not found", 404);
  }
  return c.json(updatedAddress, 200);
};

export const deleteAddress = async (c: Context) => {
  const id = c.req.param("id");
  const deleted = await addressService.delete(Number(id));
  if (!deleted) {
    return c.text("Address not found", 404);
  }
  return c.text("Address deleted", 200);
};
