import { type FastifyInstance } from "fastify";
import { userRoutes } from "./user.routes";
import { authRoutes } from "./auth.routes";

export async function routes(app: FastifyInstance) {
  userRoutes(app);
  authRoutes(app);
}
