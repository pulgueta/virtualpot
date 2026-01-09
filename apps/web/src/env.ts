import { createEnv } from "@t3-oss/env-core";
import { railway } from "@t3-oss/env-core/presets-zod";
import { url } from "zod";

export const env = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_API_URL: url(),
  },
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
  extends: [railway()],
});
