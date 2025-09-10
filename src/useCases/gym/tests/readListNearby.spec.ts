import { it, expect, describe, beforeEach } from "vitest";
import { ReadListNearbyGymInUseCase } from "../readListNearby.useCaser";
import { type IGymRepository } from "@/repositories/gym.repository";
import { GymRepositoryMock } from "@/mocks/gym-repository-mock";
import { ApiError } from "@/utils/apiError";

let gymRepository: IGymRepository;
let sut: ReadListNearbyGymInUseCase;

describe("Retrieve a list of gyms by proximity", () => {
  beforeEach(() => {
    gymRepository = new GymRepositoryMock();
    sut = new ReadListNearbyGymInUseCase(gymRepository);
  });

  it("should be able to list gyms by proximity", async () => {
    const { gyms } = await sut.execute({
      userLatitude: -7.5628074,
      userLongitude: -35.0084014,
    });

    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ name: "Near Gym" })]);
  });

  it("should not be able to list gyms by proximity with invalid coordinates", async () => {
    await expect(
      sut.execute({
        userLatitude: 0,
        userLongitude: 0,
      })
    ).rejects.toBeInstanceOf(ApiError);
  });

  it("should not be able to list gyms by proximity with coordinates out of range", async () => {
    const { gyms } = await sut.execute({
      userLatitude: -9.5628074,
      userLongitude: -35.0084014,
    });

    expect(gyms).toHaveLength(0);
  });
});
