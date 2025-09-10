import { ReadListByNameGymInUseCase } from "@/useCases/gym/readListByName.useCase";
import { GymRepository } from "@/repositories/gym.repository";

export function makeReadListByNameGymInUseCase() {
  const gymRepository = new GymRepository();
  const readListByNameGymInUseCase = new ReadListByNameGymInUseCase(
    gymRepository
  );

  return readListByNameGymInUseCase;
}
