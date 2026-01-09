import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";

import { env } from "@/env";
import { healthRoutes } from "@/routes/health";
import { userRoutes } from "@/routes/users";

const app = new Elysia()
  .use(
    cors({
      origin: env.FRONTEND_URL,
    })
  )
  .get("/", () => ({
    message: "VirtualPot API",
    version: "1.0.0",
  }))
  .use(healthRoutes)
  .use(userRoutes)
  .listen({
    port: env.PORT,
    hostname: env.HOSTNAME,
  });

console.log(
  `🦊 Elysia is running at ${app.server?.hostname ?? env.HOSTNAME}:${
    app.server?.port ?? env.PORT
  }`
);

export type App = typeof app;
