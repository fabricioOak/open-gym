import { UserRepository } from "@/repositories/user.repository";
import { CreateUserUseCase } from "@/useCases/user/create.useCase";

export function makeCreateUserUseCase() {
  const userRepository = new UserRepository();
  const createUserUseCase = new CreateUserUseCase(userRepository);

  return createUserUseCase;
}
