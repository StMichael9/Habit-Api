import { env as loadEnv } from "custom-env";
import { z } from "zod";

// Default stage
process.env.APP_STAGE ??= "dev";

const APP_STAGE = process.env.APP_STAGE;

// Correct comparisons
export const isProd = APP_STAGE === "production";
export const isDev = APP_STAGE === "dev";
export const isTest = APP_STAGE === "test";

// Load env files
if (isDev) loadEnv();
if (isTest) loadEnv("test");

// Schema
const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),

  APP_STAGE: z.enum(["dev", "production", "test"]),

  PORT: z.coerce.number().positive().default(3000),

  DATABASE_URL: z
    .string()
    .startsWith("postgresql://", "DATABASE_URL must be postgres"),

  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),

  JWT_EXPIRES_IN: z.string().default("7d"),

  BCRYPT_ROUNDS: z.coerce.number().min(10).max(20).default(12),
});

// Validate once
let env;
try {
  env = EnvSchema.parse(process.env);
} catch (err) {
  if (err instanceof z.ZodError) {
    console.error("❌ Invalid environment variables:");
    console.error(JSON.stringify(err.flatten().fieldErrors, null, 2));
  } else {
    console.error(err);
  }
  process.exit(1);
}

export default env;
export { env };
