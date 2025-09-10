import { it, expect, describe, beforeEach, afterEach, vi } from "vitest";
import { ValidateCheckInUseCase } from "../validate.useCase";
import { type ICheckInRepository } from "@/repositories/checkIn.repository";
import { CheckInRepositoryMock } from "@/mocks/checkIn-repository-mock";
import { ApiError } from "@/utils/apiError";

let checkInRepository: ICheckInRepository;
let sut: ValidateCheckInUseCase;

describe("Check-in validation", () => {
  beforeEach(() => {
    checkInRepository = new CheckInRepositoryMock();
    sut = new ValidateCheckInUseCase(checkInRepository);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to validate a check-in", async () => {
    const checkIn = await checkInRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    const { checkIn: validatedCheckIn } = await sut.execute({
      checkInId: checkIn.id,
    });

    expect(validatedCheckIn.validated_at).toEqual(expect.any(Date));
  });

  it("should not be able to validate an inexistent check-in", async () => {
    await expect(() =>
      sut.execute({
        checkInId: "invalid-check-in-id",
      })
    ).rejects.toBeInstanceOf(ApiError);
  });

  it("should not be able to validate a check-in 20 minutes after it was created ", async () => {
    vi.setSystemTime(new Date(2022, 0, 1, 10));
    const checkIn = await checkInRepository.create({
      gym_id: "gym-01",
      user_id: "user-01",
    });

    vi.advanceTimersByTime(1000 * 60 * 21);

    await expect(() =>
      sut.execute({
        checkInId: checkIn.id,
      })
    ).rejects.toBeInstanceOf(ApiError);
  });
});
