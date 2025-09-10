import { type IGymRepository } from "@/repositories/gym.repository";
import { ApiError } from "@/utils/apiError";
import { type Gym } from "@prisma/client";

export interface ReadListNearbyGymInUseCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

export type ReadListNearbyGymInUseCaseResponse = {
  gyms: Gym[];
};

export class ReadListNearbyGymInUseCase {
  constructor(private gymRepository: IGymRepository) {}
  async execute(
    data: ReadListNearbyGymInUseCaseRequest
  ): Promise<ReadListNearbyGymInUseCaseResponse> {
    const { userLatitude, userLongitude } = data;

    if (!userLatitude || !userLongitude) {
      throw new ApiError(400, "Coordinates not provided");
    }

    const gyms = await this.gymRepository.findNearby(
      userLatitude,
      userLongitude
    );

    return {
      gyms,
    };
  }
}
