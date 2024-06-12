import { z } from "zod";

export const userSchema = z.object({
  name: z.string(),
  contact_phone: z.string(),
  phone_verified: z.boolean(),
  email: z.string().email(),
  email_verified: z.boolean(),
  confirmation_code: z.string().optional(),
  password: z.string(),
  username: z.string(),
  role: z.enum(["admin", "user"]),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

// Other schemas
export const restaurantschema = z.object({
  name: z.string().min(1, "Name is required"),
  street_address: z.string().min(1, "Street address is required"),
  Zip_code: z.string().min(1, "Zip code is required"),
  city_id: z.number().int().positive(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export const citySchema = z.object({
  name: z.string(),
  state_id: z.number(),
});

export const menuitemSchema = z.object({
  name: z.string(),
  restaurant_id: z.number(),
  category_id: z.number(),
  description: z.string(),
  ingredients: z.string(),
  price: z.number(),
  active: z.boolean(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export const categorySchema = z.object({
  name: z.string(),
});

export const stateSchema = z.object({
  name: z.string(),
  code: z.string(),
});

export const addressSchema = z.object({
  street_address_1: z.string(),
  street_address_2: z.string().optional(),
  zip_code: z.string(),
  delivery_instructions: z.string().optional(),
  user_id: z.number(),
  city_id: z.number(),
  created_at: z.date().optional(),
  updated_at: z.date().optional(),
});

export const ordermenuitemSchema = z.object({
  order_id: z.number(),
  menu_item_id: z.number(),
  quantity: z.number(),
  item_price: z.number(),
  price: z.number(),
  comment: z.string().optional(),
});

export const restaurantownerSchema = z.object({
  restaurant_id: z.number(),
  owner_id: z.number().optional(),
});

export const driverSchema = z.object({
  car_make: z.string(),
  car_model: z.string(),
  car_year: z.number(),
  user_id: z.number(),
  online: z.boolean(),
  delivering: z.boolean(),
});

export const ordersSchema = z.object({
  restaurant_id: z.number(),
  estimated_delivery_time: z.string().optional(),
  actual_delivery_time: z.string().optional(),
  delivery_address_id: z.number(),
  user_id: z.number(),
  driver_id: z.number().optional(),
  price: z.number(),
  discount: z.number(),
  final_price: z.number(),
  comment: z.string().optional(),
});

export const orderStatusSchema = z.object({
  order_id: z.number(),
  status_catalog_id: z.number(),
  created_at: z.string().optional(),
});

export const statusCatalogSchema = z.object({
  name: z.string(),
});

export const commentSchema = z.object({
  order_id: z.number(),
  user_id: z.number(),
  comment_text: z.string(),
  is_complaint: z.boolean(),
  is_praise: z.boolean(),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

//authentication
export const registerUserSchema = z.object({
  user_id: z.number().optional(),
  username: z.string(),
  password: z.string(),
  role: z.string().optional(),
});

export const loginUserSchema = z.object({
  username: z.string(),
  password: z.string(),
});
