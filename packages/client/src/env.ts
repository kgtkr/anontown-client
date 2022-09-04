import * as env from "@anontown-frontend/common/dist/env";

declare const __ENV__: env.Env | undefined;
declare const __RAW_ENV__: Record<string, string | undefined> | undefined;

export const Env =
  typeof __ENV__ !== "undefined"
    ? __ENV__
    : env.loadEnv(typeof __RAW_ENV__ !== "undefined" ? __RAW_ENV__ : {});
