import { CreateGymUseCase } from "@/useCases/gym/createGym.usecase";
import { GymRepository } from "@/repositories/gym.repository";

export function makeCreateGymUseCase() {
  const gymRepository = new GymRepository();
  const createGymUseCase = new CreateGymUseCase(gymRepository);

  return createGymUseCase;
}
