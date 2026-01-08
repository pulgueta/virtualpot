import type { App } from "@backend/index";
import { treaty } from "@elysiajs/eden";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const api = treaty<App>(API_URL);
