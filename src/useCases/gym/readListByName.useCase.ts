import { type IGymRepository } from "@/repositories/gym.repository";
import { ApiError } from "@/utils/apiError";
import { type Gym } from "@prisma/client";

export interface ReadListByNameGymInUseCaseRequest {
  gymName: string;
  page: number;
}

export type ReadListByNameGymInUseCaseResponse = {
  gyms: Gym[];
};

export class ReadListByNameGymInUseCase {
  constructor(private gymRepository: IGymRepository) {}
  async execute(
    data: ReadListByNameGymInUseCaseRequest
  ): Promise<ReadListByNameGymInUseCaseResponse> {
    const { gymName, page = 1 } = data;

    if (!gymName) {
      throw new ApiError(400, "Gym name not provided");
    }

    const gyms = await this.gymRepository.findByName(gymName, page);

    return {
      gyms,
    };
  }
}
