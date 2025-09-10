import { ReadListNearbyGymInUseCase } from "@/useCases/gym/readListNearby.useCaser";
import { GymRepository } from "@/repositories/gym.repository";

export function makeReadListNearbyGymInUseCase() {
  const gymRepository = new GymRepository();
  const readListNearbyGymInUseCase = new ReadListNearbyGymInUseCase(
    gymRepository
  );

  return readListNearbyGymInUseCase;
}
