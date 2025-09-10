import { it, expect, describe, beforeEach } from "vitest";
import { ReadListByUserCheckInUseCase } from "../readListByUser.useCase";
// import { ApiError } from "@/utils/apiError";
import { type ICheckInRepository } from "@/repositories/checkIn.repository";
import { CheckInRepositoryMock } from "@/mocks/checkIn-repository-mock";

let checkInRepository: ICheckInRepository;
let sut: ReadListByUserCheckInUseCase;

describe("Retrieve a user check-ins", () => {
  beforeEach(() => {
    checkInRepository = new CheckInRepositoryMock();
    sut = new ReadListByUserCheckInUseCase(checkInRepository);
  });

  it("should be able to list a user check-ins", async () => {
    await checkInRepository.create({
      user_id: "user-01",
      gym_id: "gym-01",
    });

    await checkInRepository.create({
      user_id: "user-01",
      gym_id: "gym-02",
    });

    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 1,
    });

    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-01" }),
      expect.objectContaining({ gym_id: "gym-02" }),
    ]);
  });

  it("should be able to list a paginated user check-ins", async () => {
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        user_id: "user-01",
        gym_id: `gym-${i}`,
      });
    }
    const { checkIns } = await sut.execute({
      userId: "user-01",
      page: 2,
    });

    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-21" }),
      expect.objectContaining({ gym_id: "gym-22" }),
    ]);
  });
});
