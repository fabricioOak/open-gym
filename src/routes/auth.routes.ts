import { type FastifyInstance } from "fastify";
import { login } from "../controllers/auth/login.controller";

export async function authRoutes(app: FastifyInstance) {
  app.post("/auth", login);
}
