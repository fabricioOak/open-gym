import { it, expect, describe, beforeEach } from "vitest";
import { MetricsCheckInUseCase } from "../countByUser.useCase";
// import { ApiError } from "@/utils/apiError";
import { type ICheckInRepository } from "@/repositories/checkIn.repository";
import { CheckInRepositoryMock } from "@/mocks/checkIn-repository-mock";

let checkInRepository: ICheckInRepository;
let sut: MetricsCheckInUseCase;

describe("Retrieve a user check-ins count", () => {
  beforeEach(() => {
    checkInRepository = new CheckInRepositoryMock();
    sut = new MetricsCheckInUseCase(checkInRepository);
  });

  it("should be able to count all check-ins by user", async () => {
    await checkInRepository.create({
      user_id: "user-01",
      gym_id: "gym-01",
    });

    await checkInRepository.create({
      user_id: "user-01",
      gym_id: "gym-02",
    });

    await checkInRepository.create({
      user_id: "user-01",
      gym_id: "gym-02",
    });

    const { checkInsCount } = await sut.execute({
      userId: "user-01",
    });

    expect(checkInsCount).toEqual(3);
  });
});
