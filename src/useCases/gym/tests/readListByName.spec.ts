import { it, expect, describe, beforeEach } from "vitest";
import { ReadListByNameGymInUseCase } from "../readListByName.useCase";
import { type IGymRepository } from "@/repositories/gym.repository";
import { GymRepositoryMock } from "@/mocks/gym-repository-mock";

let gymRepository: IGymRepository;
let sut: ReadListByNameGymInUseCase;

describe("Retrieve a list of gyms by name", () => {
  beforeEach(() => {
    gymRepository = new GymRepositoryMock();
    sut = new ReadListByNameGymInUseCase(gymRepository);
  });

  it("should be able to list gyms by name", async () => {
    const { gyms } = await sut.execute({
      gymName: "JavaScript",
      page: 1,
    });

    expect(gyms).toEqual([expect.objectContaining({ id: "gym-01" })]);
  });
});
