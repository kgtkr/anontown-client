export interface Env {
  client: {
    origin: string;
  };
  camo: {
    origin: string;
    key: string;
  };
  api: {
    origin: string;
  };
  socket: {
    origin: string;
  };
  recaptcha: {
    siteKey: string;
  };
  imgur: {
    clientID: string;
  };
  ga: {
    id: string;
  } | null;
  vapid: {
    publicKey: string;
  };
}

function unwrap<A>(x: A | undefined): A {
  if (x !== undefined) {
    return x;
  } else {
    throw new Error();
  }
}

export function loadEnv(env: Record<string, string | undefined>): Env {
  return {
    client: {
      origin: unwrap(env["CLIENT_ORIGIN"]),
    },
    camo: {
      origin: unwrap(env["CAMO_ORIGIN"]),
      key: unwrap(env["CAMO_KEY"]),
    },
    api: {
      origin: unwrap(env["API_ORIGIN"]),
    },
    socket: {
      origin: unwrap(env["SOCKET_ORIGIN"]),
    },
    recaptcha: {
      siteKey: unwrap(env["RECAPTCHA_SITE_KET"]),
    },
    imgur: {
      clientID: unwrap(env["IMGUR_CLIENT_ID"]),
    },
    ga: env["GA"] ? { id: env["GA"] } : null,
    vapid: {
      publicKey: unwrap(env["VAPID_PUBLIC_KEY"]),
    },
  };
}

export function htmlInject(appEnv: Env, html: string): string {
  return html.replace(
    new RegExp(`__APP_ENV__`, "g"),
    JSON.stringify(appEnv).replace(/</g, "\\u003c"),
  );
}
