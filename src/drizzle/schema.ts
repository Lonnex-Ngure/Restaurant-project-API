import {
  pgTable,
  serial,
  integer,
  timestamp,
  varchar,
  numeric,
  boolean,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm";

export const restaurantTable = pgTable("restaurant", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  street_address: varchar("street_address").notNull(),
  Zip_code: varchar("Zip_code").notNull(),
  city_id: integer("city_id")
    .notNull()
    .references(() => cityTable.id),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const menuitemTable = pgTable("menu_item", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  restaurant_id: integer("restaurant_id")
    .notNull()
    .references(() => restaurantTable.id),
  category_id: integer("category_id")
    .notNull()
    .references(() => categoryTable.id),
  description: varchar("description").notNull(),
  ingredients: varchar("ingredients").notNull(),
  price: numeric("price").notNull(),
  active: boolean("active").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const cityTable = pgTable("city", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  state_id: integer("state_id")
    .notNull()
    .references(() => stateTable.id),
});

export const categoryTable = pgTable("category", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
});

export const stateTable = pgTable("state", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  code: varchar("code").notNull(),
});

export const addressTable = pgTable("address", {
  id: serial("id").primaryKey(),
  street_address_1: varchar("street_address_1").notNull(),
  street_address_2: varchar("street_address_2"),
  zip_code: varchar("zip_code").notNull(),
  delivery_instructions: varchar("delivery_instructions"),
  user_id: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  city_id: integer("city_id")
    .notNull()
    .references(() => cityTable.id),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const ordermenuitemTable = pgTable("order_menu_item", {
  id: serial("id").primaryKey(),
  order_id: integer("order_id")
    .notNull()
    .references(() => ordersTable.id),
  menu_item_id: integer("menu_item_id")
    .notNull()
    .references(() => menuitemTable.id),
  quantity: integer("quantity").notNull(),
  item_price: numeric("item_price").notNull(),
  price: numeric("price").notNull(),
  comment: varchar("comment"),
});

export const restaurantownerTable = pgTable("restaurant_owner", {
  id: serial("id").primaryKey().notNull(),
  restaurant_id: integer("restaurant_id")
    .notNull()
    .references(() => restaurantTable.id),
  owner_id: integer("owner_id").references(() => usersTable.id),
});

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
  contact_phone: varchar("contact_phone").notNull(),
  phone_verified: boolean("phone_verified").notNull(),
  email: varchar("email").notNull(),
  email_verified: boolean("email_verified").notNull(),
  confirmation_code: varchar("confirmation_code"),
  password: varchar("password").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const driverTable = pgTable("driver", {
  id: serial("id").primaryKey(),
  car_make: varchar("car_make").notNull(),
  car_model: varchar("car_model").notNull(),
  car_year: integer("car_year").notNull(),
  user_id: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  online: boolean("online").notNull(),
  delivering: boolean("delivering").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const ordersTable = pgTable("orders", {
  id: serial("id").primaryKey(),
  restaurant_id: integer("restaurant_id")
    .notNull()
    .references(() => restaurantTable.id),
  estimated_delivery_time: timestamp("estimated_delivery_time").notNull(),
  actual_delivery_time: timestamp("actual_delivery_time"),
  delivery_address_id: integer("delivery_address_id")
    .notNull()
    .references(() => addressTable.id),
  user_id: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  driver_id: integer("driver_id").references(() => driverTable.id),
  price: numeric("price").notNull(),
  discount: numeric("discount").notNull(),
  final_price: numeric("final_price").notNull(),
  comment: varchar("comment"),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const orderstatusTable = pgTable("order_status", {
  id: serial("id").primaryKey(),
  order_id: integer("order_id")
    .notNull()
    .references(() => ordersTable.id),
  status_catalog_id: integer("status_catalog_id")
    .notNull()
    .references(() => statuscatalogTable.id),
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export const statuscatalogTable = pgTable("status_catalog", {
  id: serial("id").primaryKey(),
  name: varchar("name").notNull(),
});

export const commentTable = pgTable("comment", {
  id: serial("id").primaryKey(),
  order_id: integer("order_id")
    .notNull()
    .references(() => ordersTable.id),
  user_id: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  comment_text: varchar("comment_text").notNull(),
  is_complaint: boolean("is_complaint").notNull(),
  is_praise: boolean("is_praise").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

//auth table
export const authTable = pgTable("auth", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
  username: varchar("username").notNull(),
  password: varchar("password").notNull(),
  email: varchar("email").notNull(),
  role: varchar("role").notNull(),
  created_at: timestamp("created_at").notNull().defaultNow(),
  updated_at: timestamp("updated_at").notNull().defaultNow(),
});

export const usersRelations = relations(usersTable, ({ one }) => ({
  address: one(addressTable, {
    fields: [usersTable.id],
    references: [addressTable.user_id],
  }),
  orders: one(ordersTable, {
    fields: [usersTable.id],
    references: [ordersTable.user_id],
  }),
  comments: one(commentTable, {
    fields: [usersTable.id],
    references: [commentTable.user_id],
  }),
  driver: one(driverTable, {
    fields: [usersTable.id],
    references: [driverTable.user_id],
  }),
}));

export const addressRelations = relations(addressTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [addressTable.user_id],
    references: [usersTable.id],
  }),
  city: one(cityTable, {
    fields: [addressTable.city_id],
    references: [cityTable.id],
  }),
}));

export const ordersRelations = relations(ordersTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [ordersTable.user_id],
    references: [usersTable.id],
  }),
  restaurant: one(restaurantTable, {
    fields: [ordersTable.restaurant_id],
    references: [restaurantTable.id],
  }),
  driver: one(driverTable, {
    fields: [ordersTable.driver_id],
    references: [driverTable.id],
  }),
  deliveryAddress: one(addressTable, {
    fields: [ordersTable.delivery_address_id],
    references: [addressTable.id],
  }),
}));

export const restaurantRelations = relations(restaurantTable, ({ one }) => ({
  city: one(cityTable, {
    fields: [restaurantTable.city_id],
    references: [cityTable.id],
  }),
}));

export const menuitemRelations = relations(menuitemTable, ({ one }) => ({
  restaurant: one(restaurantTable, {
    fields: [menuitemTable.restaurant_id],
    references: [restaurantTable.id],
  }),
  category: one(categoryTable, {
    fields: [menuitemTable.category_id],
    references: [categoryTable.id],
  }),
}));

export const cityRelations = relations(cityTable, ({ one }) => ({
  state: one(stateTable, {
    fields: [cityTable.state_id],
    references: [stateTable.id],
  }),
}));

export const driverRelations = relations(driverTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [driverTable.user_id],
    references: [usersTable.id],
  }),
}));

export const restaurantownerRelations = relations(
  restaurantownerTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [restaurantownerTable.owner_id],
      references: [usersTable.id],
    }),
    restaurant: one(restaurantTable, {
      fields: [restaurantownerTable.restaurant_id],
      references: [restaurantTable.id],
    }),
  })
);

export const ordermenuitemRelations = relations(
  ordermenuitemTable,
  ({ one }) => ({
    order: one(ordersTable, {
      fields: [ordermenuitemTable.order_id],
      references: [ordersTable.id],
    }),
    menu_item: one(menuitemTable, {
      fields: [ordermenuitemTable.menu_item_id],
      references: [menuitemTable.id],
    }),
  })
);

export const orderStatusRelations = relations(orderstatusTable, ({ one }) => ({
  order: one(ordersTable, {
    fields: [orderstatusTable.order_id],
    references: [ordersTable.id],
  }),
  status: one(statuscatalogTable, {
    fields: [orderstatusTable.status_catalog_id],
    references: [statuscatalogTable.id],
  }),
}));

export const commentRelations = relations(commentTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [commentTable.user_id],
    references: [usersTable.id],
  }),
}));

export const authRelations = relations(authTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [authTable.user_id],
    references: [usersTable.id],
  }),
}));
