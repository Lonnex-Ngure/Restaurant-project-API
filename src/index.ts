import { serve } from "@hono/node-server";
import { Hono } from "hono";
import "dotenv/config";
import { restaurantRouter } from "./restaurants/restaurant.router";
import { usersRouter } from "./users/users.router";
import { cityRouter } from "./city/city.router";
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
import { html } from "hono/html";

const app = new Hono();

app.get("/", (c) => {
  return c.html(html`<!DOCTYPE html>
    <html>
      <head>
        <title>Restaurant API</title>
        <style>
          body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);
          }
          .container {
            text-align: center;
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            max-width: 600px;
            margin: 20px;
          }
          h1 {
            color: #333;
            margin-bottom: 20px;
            font-size: 2.5em;
          }
          p {
            color: #666;
            margin-bottom: 20px;
            font-size: 1.2em;
          }
          nav a {
            display: inline-block;
            margin: 10px;
            padding: 15px 20px;
            color: white;
            background: linear-gradient(to right, #6a11cb, #2575fc);
            border-radius: 8px;
            text-decoration: none;
            transition: transform 0.2s, background 0.3s ease;
          }
          nav a:hover {
            background: linear-gradient(to right, #2575fc, #6a11cb);
            transform: translateY(-5px);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Hello Visitor!</h1>
          <p>Welcome to restaurant API by Lonnex Ngure!</p>
          <nav>
            <a href="/api/restaurant">Restaurant</a>
            <a href="/api/users">Users</a>
            <a href="/api/city">City</a>
            <a href="/api/menuitem">Menu Items</a>
            <a href="/api/category">Category</a>
            <a href="/api/state">State</a>
            <a href="/api/address">Address</a>
            <a href="/api/ordermenuitem">Order Menu Items</a>
            <a href="/api/restaurantowner">Restaurant Owner</a>
            <a href="/api/driver">Driver</a>
            <a href="/api/orders">Orders</a>
            <a href="/api/orderstatus">Order Status</a>
            <a href="/api/statuscatalog">Status Catalog</a>
            <a href="/api/comment">Comments</a>
          </nav>
        </div>
      </body>
    </html>`);
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
