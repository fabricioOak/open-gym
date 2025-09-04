import { z } from "zod";

export const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.coerce.number(),
});

export const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  throw new Error(z.prettifyError(_env.error));
}

export const env = _env.data;
