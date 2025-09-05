import fastify from "fastify";
import { routes } from "./routes";
import { z, ZodError } from "zod";
import { env } from "./env";

export const app = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        colorize: true,
      },
    },
  },
});

routes(app);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    const issues = z.formatError(error);
    reply.status(400).send({ message: "Validation error", issues });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  } else {
    // TODO: Should log to a tool like DataDog/NewRelic/Sentry
  }

  return reply.status(500).send({ message: "Internal server error" });
});
