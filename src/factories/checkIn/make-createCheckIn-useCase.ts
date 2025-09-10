import { CreateCheckInUseCase } from "@/useCases/checkIn/createCheckIn.useCase";
import { CheckInRepository } from "@/repositories/checkIn.repository";
import { GymRepository } from "@/repositories/gym.repository";

export function makeCreateCheckInUseCase() {
  const checkInRepository = new CheckInRepository();
  const gymRepository = new GymRepository();

  const createCheckInUseCase = new CreateCheckInUseCase(
    checkInRepository,
    gymRepository
  );

  return createCheckInUseCase;
}
