import { type FastifyInstance } from "fastify";
import { createUser } from "../controllers/user/create.controller";
import { getUser } from "@/controllers/user/getUser.controller";

export async function userRoutes(app: FastifyInstance) {
  app.post("/users", createUser);
  app.get("/users/:id", getUser);
}
