import * as env from "@anontown-frontend/common/lib/env";

declare const __ENV__: env.Env | undefined;
declare const __RAW_ENV__: Record<string, string | undefined> | undefined;
declare const __ENABLE_BFF__: boolean;

export const Env =
  typeof __ENV__ !== "undefined"
    ? __ENV__
    : env.loadEnv(typeof __RAW_ENV__ !== "undefined" ? __RAW_ENV__ : {});
export const EnableBff = __ENABLE_BFF__;
