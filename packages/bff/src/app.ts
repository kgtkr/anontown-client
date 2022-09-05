import Koa from "koa";
import koaStatic from "koa-static";
import * as path from "path";
import { env } from "./env";
import * as fs from "fs/promises";
import { htmlInject } from "@anontown-frontend/app-env";
function main() {
  const app = new Koa();

  app.use(
    koaStatic(env.staticRootDir, {
      setHeaders(res, path) {
        if (path.startsWith("/assets/")) {
          res.setHeader(
            "cache-control",
            `public, max-age=${60 * 60 * 24 * 30}, immutable`
          );
        }
      },
      index: false,
    })
  );

  app.use(async (ctx) => {
    const body = await fs.readFile(
      path.join(env.staticRootDir, ".index.html"),
      "utf8"
    );

    ctx.body = htmlInject(env.jsEnv, body);
  });

  app.listen(env.port);
}

main();
