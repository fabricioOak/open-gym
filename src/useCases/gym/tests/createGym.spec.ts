import { it, expect, describe, beforeEach } from "vitest";
import { CreateGymUseCase } from "../createGym.usecase";
// import { ApiError } from "@/utils/apiError";
import { GymRepositoryMock } from "@/mocks/gym-repository-mock";
import { type IGymRepository } from "@/repositories/gym.repository";

let gymRepository: IGymRepository;
let sut: CreateGymUseCase;

describe("Creates a new user", () => {
  beforeEach(() => {
    gymRepository = new GymRepositoryMock();
    sut = new CreateGymUseCase(gymRepository);
  });

  it("should be able to create a new gym", async () => {
    const { gym } = await sut.execute({
      name: "gym-01",
      description: "description-01",
      phone: "phone-01",
      latitude: 0,
      longitude: 0,
    });

    expect(gym.id).toEqual(expect.any(String));
  });
});
