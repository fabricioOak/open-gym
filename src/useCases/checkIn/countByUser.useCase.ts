import { type ICheckInRepository } from "@/repositories/checkIn.repository";
import { ApiError } from "@/utils/apiError";

export interface MetricsCheckInUseCaseRequest {
  userId: string;
}

export type MetricsCheckInUseCaseResponse = {
  checkInsCount: number;
};

export class MetricsCheckInUseCase {
  constructor(private checkInRepository: ICheckInRepository) {}
  async execute(
    data: MetricsCheckInUseCaseRequest
  ): Promise<MetricsCheckInUseCaseResponse> {
    const { userId } = data;

    if (!userId) {
      throw new ApiError(400, "User ID not provided");
    }

    const checkInsCount = await this.checkInRepository.countByUserId(userId);

    return {
      checkInsCount,
    };
  }
}
