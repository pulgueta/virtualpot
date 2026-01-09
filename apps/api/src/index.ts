import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";

import { healthRoutes } from "@/routes/health";
import { userRoutes } from "@/routes/users";

const app = new Elysia()
  .use(
    cors({
      origin: process.env.FRONTEND_URL,
    })
  )
  .use(
    swagger({
      documentation: {
        info: {
          title: "VirtualPot API",
          version: "1.0.0",
          description: "API for VirtualPot application",
        },
        tags: [
          { name: "health", description: "Health check endpoints" },
          { name: "users", description: "User management endpoints" },
        ],
      },
    })
  )
  .get("/", () => ({
    message: "VirtualPot API",
    version: "1.0.0",
  }))
  .use(healthRoutes)
  .use(userRoutes)
  .listen(3001);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
