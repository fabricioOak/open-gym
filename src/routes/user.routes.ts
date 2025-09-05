import { type FastifyInstance } from "fastify";
import { createUser } from "../controllers/user/create.controller";

export async function userRoutes(app: FastifyInstance) {
  app.post("/users", createUser);
}
