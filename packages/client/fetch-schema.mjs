import { getIntrospectionQuery } from "graphql/utilities/index.mjs";
import * as fs from "fs/promises";

const introspectionQuery = getIntrospectionQuery();
const schema = await fetch("http://localhost:8080", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ query: introspectionQuery }),
}).then((res) => res.json());
await fs.writeFile("schema.json", JSON.stringify(schema));
