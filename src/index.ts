import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import { restaurantRouter } from "./restaurants/restaurant.router";
import { usersRouter } from "./users/users.router";
import { cityRouter } from "./city/city.router"
import { menuitemRouter } from "./menu_items/menuitem.router";
import { categoryRouter } from "./category/category.router";
import { stateRouter } from "./state/state.router";
import { addressRouter } from "./address/address.router";
import { ordermenuitemRouter } from "./order menu item/ordermenuitem.router";
import { restaurantownerRouter } from "./restaurant owner/restaurantowner.router";
import { driverRouter } from "./driver/driver.router";
import { ordersRouter } from "./orders/orders.router";
import { orderStatusRouter } from "./order status/orderstatus.router";
import { statusCatalogRouter } from "./status catalog/statuscatalog.router";
import { commentRouter } from "./comment/comment.router";
import { authRouter } from "./auth/auth.router";
import { html, raw } from "hono/html"

const app = new Hono();

app.get("/", (c) => {
  return c.html(html`<!DOCTYPE html>
      <h1>Hello Hono!</h1>
      <p>Welcome to restaurant API</P>`
  );
});

app.route("/api", restaurantRouter);
app.route("/api", usersRouter);
app.route("/api", cityRouter);
app.route("/api", menuitemRouter);
app.route("/api", categoryRouter);
app.route("/api", stateRouter);
app.route("/api", addressRouter);
app.route("/api", ordermenuitemRouter);
app.route("/api", restaurantownerRouter);
app.route("/api", driverRouter);
app.route("/api", ordersRouter);
app.route("/api", orderStatusRouter);
app.route("/api", statusCatalogRouter);
app.route("/api", commentRouter);
app.route("/api/auth", authRouter);

console.log(`Server is running on port ${process.env.PORT}`);

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT) || 3000,
});
