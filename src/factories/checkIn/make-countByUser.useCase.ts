import { MetricsCheckInUseCase } from "@/useCases/checkIn/countByUser.useCase";
import { CheckInRepository } from "@/repositories/checkIn.repository";

export function makeMetricsCheckInUseCase() {
  const checkInRepository = new CheckInRepository();

  const metricsCheckInUseCase = new MetricsCheckInUseCase(checkInRepository);

  return metricsCheckInUseCase;
}
