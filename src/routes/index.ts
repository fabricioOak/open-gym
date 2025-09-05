import { type FastifyInstance } from "fastify";
import { userRoutes } from "./user.routes";

export async function routes(app: FastifyInstance) {
  userRoutes(app);
}
