import { UserRepository } from "@/repositories/user.repository";
import { LoginUseCase } from "@/useCases/auth/login.useCase";

export function makeLoginUseCase() {
  const userRepository = new UserRepository();
  const loginUseCase = new LoginUseCase(userRepository);

  return loginUseCase;
}
