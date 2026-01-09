import { createEnv } from "@t3-oss/env-core";
import { railway } from "@t3-oss/env-core/presets-zod";
import { coerce, string, url } from "zod";

export const env = createEnv({
  server: {
    FRONTEND_URL: url(),
    PORT: coerce.number().default(3001),
    HOSTNAME: string().default("localhost"),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
  extends: [railway()],
});
