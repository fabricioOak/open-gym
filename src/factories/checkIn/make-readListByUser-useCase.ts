import { ReadListByUserCheckInUseCase } from "@/useCases/checkIn/readListByUser.useCase";
import { CheckInRepository } from "@/repositories/checkIn.repository";

export function makeReadListByUserCheckInUseCase() {
  const checkInRepository = new CheckInRepository();

  const readListByUserCheckInUseCase = new ReadListByUserCheckInUseCase(
    checkInRepository
  );

  return readListByUserCheckInUseCase;
}
