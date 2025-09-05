import { UserRepository } from "@/repositories/user.repository";
import { CreateUserUseCase } from "@/useCases/user/create.useCase";
import { ApiError } from "@/utils/apiError";
import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function createUser(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    legalName: z.string(),
    socialName: z.string().optional(),
    email: z.email(),
    password: z.string().min(6),
  });

  const { legalName, socialName, email, password } = registerBodySchema.parse(
    request.body
  );

  try {
    const userRepository = new UserRepository();
    const createUserUseCase = new CreateUserUseCase(userRepository);

    await createUserUseCase.execute({
      legalName,
      socialName,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return reply.status(error.status).send({ message: error.message });
    }

    throw error;
  }
}
