import { makeGetUserUseCase } from "@/factories/user/make-getUser-useCase";
import { ApiError } from "@/utils/apiError";
import type { FastifyRequest, FastifyReply } from "fastify";
import { z } from "zod";

export async function getUser(request: FastifyRequest, reply: FastifyReply) {
  const getUserParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = getUserParamsSchema.parse(request.params);

  try {
    const getUserUseCase = makeGetUserUseCase();

    const { user } = await getUserUseCase.execute({
      userId: id,
    });

    return reply.status(200).send({
      success: true,
      data: user,
      message: "User retrieved successfully",
    });
  } catch (error) {
    if (error instanceof ApiError) {
      return reply
        .status(error.status)
        .send({ message: error.message, success: false });
    }
    throw error;
  }
}
