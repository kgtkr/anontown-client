import {
  getIntrospectionQuery,
  buildClientSchema,
  printSchema,
} from "graphql/utilities/index.mjs";
import * as fs from "fs/promises";
import axios from "axios";

const introspectionQuery = getIntrospectionQuery();
const schema = await new axios.post("http://localhost:8080", {
  query: introspectionQuery,
}).then((res) => res.data);
await fs.writeFile("schema.json", JSON.stringify(schema));
