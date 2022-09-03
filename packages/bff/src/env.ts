import { Env as JSEnv, loadEnv } from "@anontown/common/lib/env";

export interface Env {
  jsEnv: JSEnv;
  port: number;
  staticRootDir: string;
}

export const env: Env = {
  jsEnv: loadEnv(process.env),
  port: Number(process.env["PORT"] ?? 3000),
  staticRootDir: process.env["STATIC_ROOT_DIR"]!,
};
