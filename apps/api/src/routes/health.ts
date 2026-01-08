import { Elysia } from "elysia";

export const healthRoutes = new Elysia({ prefix: "/health", tags: ["health"] })
  .get("/", () => ({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  }))
  .get("/ready", () => ({
    ready: true,
    timestamp: new Date().toISOString(),
  }));
