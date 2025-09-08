import { makeLoginUseCase } from "@/factories/auth/make-auth-useCase";
import { ApiError } from "@/utils/apiError";
import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const loginBodySchema = z.object({
    email: z.email(),
    password: z.string().min(6),
  });

  const { email, password } = loginBodySchema.parse(request.body);

  try {
    const loginUserCase = makeLoginUseCase();

    await loginUserCase.execute({
      email,
      password,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return reply.status(error.status).send({ message: error.message });
    }

    throw error;
  }

  return reply.status(200).send({
    success: true,
    message: "Login successful",
  });
}
