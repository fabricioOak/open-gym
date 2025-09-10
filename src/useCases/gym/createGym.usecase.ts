import { type IGymRepository } from "@/repositories/gym.repository";
import { type Gym } from "@prisma/client";

export interface CreateGymUseCaseRequest {
  name: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

export type CreateGymUseCaseResponse = {
  gym: Gym;
};

export class CreateGymUseCase {
  constructor(private gymRepository: IGymRepository) {}
  async execute(
    data: CreateGymUseCaseRequest
  ): Promise<CreateGymUseCaseResponse> {
    const { name, description, phone, latitude, longitude } = data;

    const gym = await this.gymRepository.create({
      name,
      description,
      phone,
      latitude,
      longitude,
    });

    return {
      gym,
    };
  }
}
