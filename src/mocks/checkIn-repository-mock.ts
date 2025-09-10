import { type ICheckInRepository } from "@/repositories/checkIn.repository";
import { ApiError } from "@/utils/apiError";
import { type Prisma, type CheckIn } from "@prisma/client";
import dayjs from "dayjs";
import { randomUUID } from "node:crypto";

export class CheckInRepositoryMock implements ICheckInRepository {
  public items: CheckIn[] = [];
  async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    };

    this.items.push(checkIn);

    return checkIn;
  }

  async findByUserIdOnDate(
    userId: string,
    date: Date
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf("date");
    const endOfTheDay = dayjs(date).endOf("date");

    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at);
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay);

      return checkIn.user_id === userId && isOnSameDate;
    });

    if (!checkInOnSameDate) {
      return null;
    }

    return checkInOnSameDate;
  }

  async findManyByUserId(userId: string, page: number): Promise<CheckIn[]> {
    return this.items
      .filter((checkIn) => checkIn.user_id === userId)
      .slice((page - 1) * 20, page * 20);
  }

  async countByUserId(userId: string): Promise<number> {
    return this.items.filter((checkIn) => checkIn.user_id === userId).length;
  }

  async findById(id: string): Promise<CheckIn | null> {
    const checkIn = this.items.find((checkIn) => checkIn.id === id);

    return checkIn ?? null;
  }

  async validate(checkIn: CheckIn): Promise<CheckIn> {
    const checkInToValidate = this.items.findIndex((c) => c.id === checkIn.id);

    const checkInExpired = dayjs(checkIn.created_at).add(20, "m");

    if (dayjs().isAfter(checkInExpired)) {
      throw new ApiError(400, "Check-in expired");
    }

    if (checkInToValidate >= 0) {
      this.items[checkInToValidate].validated_at = new Date();
    }

    return checkIn;
  }
}
