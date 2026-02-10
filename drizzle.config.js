import env from "./env.js";

/** @type {import("drizzle-kit").Config} */
export default {
  dialect: "postgresql",
  schema: "./src/db/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
};
