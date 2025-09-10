import { UserRepository } from "@/repositories/user.repository";
import { GetUserUseCase } from "@/useCases/user/getUser.useCase";

export function makeGetUserUseCase() {
  const userRepository = new UserRepository();
  const getUserUseCase = new GetUserUseCase(userRepository);

  return getUserUseCase;
}
