import { makeCreateUserUseCase } from "@/factories/user/make-create-useCase";
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
    const createUserUseCase = makeCreateUserUseCase();

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

  return reply.status(201).send({
    seccess: true,
    message: "User created successfully",
  });
}
