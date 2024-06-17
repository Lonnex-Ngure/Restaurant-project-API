import "dotenv/config";
import { Context } from "hono";
import { createAuthUserService, userLoginService } from "./auth.service";
import bcrypt from "bcrypt";
import { sign } from "hono/jwt";
import { sendWelcomeEmail } from "../email.service";

export const registerUser = async (c: Context) => {
  try {
    const user = await c.req.json();
    const pass = user.password;
    const hashedPassword = await bcrypt.hash(pass, 10);
    user.password = hashedPassword;
    const createdUser = await createAuthUserService(user);
    if (!createdUser) return c.text("User not created", 404);

    await sendWelcomeEmail(user.email, user.name);

    return c.json({ msg: createdUser }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

export const loginUser = async (c: Context) => {
  try {
    const user = await c.req.json();
    const userExist = await userLoginService(user);
    if (userExist === null) return c.json({ error: "User not found" }, 404);
    const userMatch = await bcrypt.compare(
      user.password,
      userExist?.password as string
    );
    if (!userMatch) {
      return c.json({ error: "Invalid credentials" }, 401);
    } else {
      const payload = {
        sub: userExist?.username,
        role: userExist?.role,
        exp: Math.floor(Date.now() / 1000) + 60 * 180,
      };
      const secret = process.env.JWT_SECRET as string;
      
      // Log payload and secret
      console.log('Payload:', payload);
      console.log('Secret:', secret);
      
      // Await the token sign promise
      const token = await sign(payload, secret);
      
      // Log token
      console.log('Token:', token);

      return c.json(
        { token, user: { role: userExist!.role, ...userExist!.user } },
        200
      );
    }
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};
