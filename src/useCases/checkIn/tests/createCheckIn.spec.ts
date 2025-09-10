import { it, expect, describe, beforeEach, vi, afterEach } from "vitest";
import { CreateCheckInUseCase } from "../createCheckIn.useCase";
import { ApiError } from "@/utils/apiError";
import { type ICheckInRepository } from "@/repositories/checkIn.repository";
import { CheckInRepositoryMock } from "@/mocks/checkIn-repository-mock";
import { GymRepositoryMock } from "@/mocks/gym-repository-mock";
import { type IGymRepository } from "@/repositories/gym.repository";

let checkInRepository: ICheckInRepository;
let gymRepository: IGymRepository;
let sut: CreateCheckInUseCase;

describe("Check-in on a gym", () => {
  beforeEach(() => {
    checkInRepository = new CheckInRepositoryMock();
    gymRepository = new GymRepositoryMock();
    sut = new CreateCheckInUseCase(checkInRepository, gymRepository);
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("should be able to check-in", async () => {
    const { checkIn } = await sut.execute({
      gymId: "gym-02",
      userId: "user-01",
      userLatitude: 0,
      userLongitude: 0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
  it("should not able to check-in on a distant gym", async () => {
    await expect(
      sut.execute({
        gymId: "gym-01",
        userId: "user-01",
        userLatitude: -7.5628074,
        userLongitude: -35.0084014,
      })
    ).rejects.toBeInstanceOf(ApiError);
  });

  it("should not be able to check-in twice in the same day", async () => {
    await sut.execute({
      gymId: "gym-02",
      userId: "user-01",
      userLatitude: 0.0,
      userLongitude: 0.0,
    });
    await expect(
      sut.execute({
        gymId: "gym-02",
        userId: "user-01",
        userLatitude: 0.0,
        userLongitude: 0.0,
      })
    ).rejects.toBeInstanceOf(ApiError);
  });

  it("should be able to check-in twice in different days", async () => {
    vi.setSystemTime(new Date(2022, 0, 20));
    await sut.execute({
      gymId: "gym-02",
      userId: "user-01",
      userLatitude: 0.0,
      userLongitude: 0.0,
    });

    vi.setSystemTime(new Date(2022, 0, 21));

    const { checkIn } = await sut.execute({
      gymId: "gym-02",
      userId: "user-01",
      userLatitude: 0.0,
      userLongitude: 0.0,
    });

    expect(checkIn.id).toEqual(expect.any(String));
  });
});
