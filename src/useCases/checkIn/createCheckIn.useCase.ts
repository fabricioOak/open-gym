import { type ICheckInRepository } from "@/repositories/checkIn.repository";
import { type IGymRepository } from "@/repositories/gym.repository";
import { ApiError } from "@/utils/apiError";
import { getDistanceBetweenCoordinates } from "@/utils/getDistanceBetweenCoordinates";
import { type CheckIn } from "@prisma/client";

export interface CreateCheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

export type CreateCheckInUseCaseResponse = {
  checkIn: CheckIn;
};

export class CreateCheckInUseCase {
  constructor(
    private checkInRepository: ICheckInRepository,
    private gymRepository: IGymRepository
  ) {}
  async execute(
    data: CreateCheckInUseCaseRequest
  ): Promise<CreateCheckInUseCaseResponse> {
    const { userId, gymId, userLatitude, userLongitude } = data;

    const gym = await this.gymRepository.findById(gymId);

    if (!gym) {
      throw new ApiError(400, "Gym not found");
    }

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      }
    );

    const MAX_DISTANCE_IN_KM = 0.1;
    if (distance > MAX_DISTANCE_IN_KM) {
      throw new ApiError(400, "Max distance exceeded");
    }

    const checkInOnSameDate = await this.checkInRepository.findByUserIdOnDate(
      userId,
      new Date()
    );

    if (checkInOnSameDate) {
      throw new ApiError(400, "You already checked-in today on this gym");
    }

    const checkIn = await this.checkInRepository.create({
      gym_id: gymId,
      user_id: userId,
    });

    if (!checkIn) {
      throw new ApiError(404, "Error while making check-in");
    }

    return { checkIn };
  }
}
