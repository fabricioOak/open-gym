import { ValidateCheckInUseCase } from "@/useCases/checkIn/validate.useCase";
import { CheckInRepository } from "@/repositories/checkIn.repository";

export function makeValidateCheckInUseCase() {
  const checkInRepository = new CheckInRepository();

  const validateCheckInUseCase = new ValidateCheckInUseCase(checkInRepository);

  return validateCheckInUseCase;
}
