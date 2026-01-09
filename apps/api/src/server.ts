import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";

import { env } from "@/env";
import { healthRoutes } from "@/routes/health";
import { userRoutes } from "@/routes/users";

const port = process.env.PORT ?? 3000;

const app = new Elysia()
  .use(
    cors({
      origin: env.FRONTEND_URL,
    })
  )
  .use(healthRoutes)
  .use(userRoutes)
  .listen({
    port,
    hostname: env.HOSTNAME,
  });

console.log(
  `🦊 Elysia is running at ${app.server?.hostname ?? env.HOSTNAME}:${
    app.server?.port ?? port
  }`
);

export type App = typeof app;
