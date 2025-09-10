import { type ICheckInRepository } from "@/repositories/checkIn.repository";
import { ApiError } from "@/utils/apiError";
import { type CheckIn } from "@prisma/client";

export interface ReadListByUserCheckInUseCaseRequest {
  userId: string;
  page: number;
}

export type ReadListByUserCheckInUseCaseResponse = {
  checkIns: CheckIn[];
};

export class ReadListByUserCheckInUseCase {
  constructor(private checkInRepository: ICheckInRepository) {}
  async execute(
    data: ReadListByUserCheckInUseCaseRequest
  ): Promise<ReadListByUserCheckInUseCaseResponse> {
    const { userId, page } = data;

    if (!userId) {
      throw new ApiError(400, "User ID not provided");
    }

    const checkInOnSameDate = await this.checkInRepository.findManyByUserId(
      userId,
      page
    );

    return {
      checkIns: checkInOnSameDate,
    };
  }
}
