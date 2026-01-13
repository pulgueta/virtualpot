import type { App } from "@backend/server";
import { treaty } from "@elysiajs/eden";

import { env } from "@/env";

export const api = treaty<App>(env.VITE_API_URL);
