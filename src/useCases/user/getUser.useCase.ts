import { type IUserRepository } from "@/repositories/user.repository";
import { ApiError } from "@/utils/apiError";
import { type User } from "@prisma/client";

export interface GetUserUseCaseRequest {
  userId: string;
}

export type GetUserUseCaseResponse = {
  user: User;
};

export class GetUserUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(data: GetUserUseCaseRequest): Promise<GetUserUseCaseResponse> {
    const { userId } = data;

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new ApiError(409, "User not found");
    }

    return { user };
  }
}
