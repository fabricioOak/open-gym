import { type IUserRepository } from "@/repositories/user.repository";
import { ApiError } from "@/utils/apiError";
import { type User } from "@prisma/client";
import * as argon from "argon2";

export interface CreateUserUseCaseRequest {
  legalName: string;
  socialName?: string;
  email: string;
  password: string;
}

export type CreateUserUseCaseResponse = {
  user: User;
};

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}
  async execute(
    data: CreateUserUseCaseRequest
  ): Promise<CreateUserUseCaseResponse> {
    const { legalName, socialName, email, password } = data;

    const password_hash = await argon.hash(password);

    const exinstingUser = await this.userRepository.checkUserExists(email);

    if (exinstingUser !== null) {
      throw new ApiError(409, "User already exists");
    }

    const user = await this.userRepository.createUser({
      legalName,
      socialName,
      email,
      password_hash,
    });

    return { user };
  }
}
