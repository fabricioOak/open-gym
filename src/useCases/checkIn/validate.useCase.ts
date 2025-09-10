import { type ICheckInRepository } from "@/repositories/checkIn.repository";
import { ApiError } from "@/utils/apiError";
import { type CheckIn } from "@prisma/client";

export interface VaidateCheckInUseCaseRequest {
  checkInId: string;
}

export type VaidateCheckInUseCaseResponse = {
  checkIn: CheckIn;
};

export class ValidateCheckInUseCase {
  constructor(private checkInRepository: ICheckInRepository) {}
  async execute(
    data: VaidateCheckInUseCaseRequest
  ): Promise<VaidateCheckInUseCaseResponse> {
    const { checkInId } = data;

    const checkIn = await this.checkInRepository.findById(checkInId);

    if (!checkIn) {
      throw new ApiError(404, "Check-in not found");
    }

    checkIn.validated_at = new Date();

    await this.checkInRepository.validate(checkIn);

    return { checkIn };
  }
}
