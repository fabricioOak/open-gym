// import { type IAuthRepository } from "@/repositories/auth.repository";
import { type IUserRepository } from "@/repositories/user.repository";
import { ApiError } from "@/utils/apiError";
import { type User } from "@prisma/client";
import * as argon from "argon2";

export interface LoginUseCaseRequest {
  email: string;
  password: string;
}

export interface LoginUseCaseResponse {
  user: User;
}

export class LoginUseCase {
  constructor(
    private userRepository: IUserRepository // private authRepository: IAuthRepository
  ) {}

  async execute(data: LoginUseCaseRequest): Promise<LoginUseCaseResponse> {
    const { email, password } = data;

    const user = await this.userRepository.checkUserExists(email);

    if (!user) {
      throw new ApiError(401, "Email or password incorrect");
    }

    const doesPasswordMatch = await argon.verify(user.password_hash, password);

    if (!doesPasswordMatch) {
      throw new ApiError(401, "Invalid credentials");
    }

    return { user };
  }
}
