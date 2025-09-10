import { prisma } from "@/db/prisma";
import { type Prisma, type Gym } from "@prisma/client";

export interface IGymRepository {
  create(data: Prisma.GymUncheckedCreateInput): Promise<Gym>;
  findById(id: string): Promise<Gym | null>;
  findByName(name: string, page: number): Promise<Gym[]>;
  findNearby(userLatitude: number, userLongitude: number): Promise<Gym[]>;
}

export class GymRepository implements IGymRepository {
  async findById(id: string): Promise<Gym | null> {
    const gym = prisma.gym.findUnique({
      where: {
        id,
      },
    });

    return gym;
  }

  async create(data: Prisma.GymUncheckedCreateInput): Promise<Gym> {
    const gym = prisma.gym.create({
      data,
    });

    return gym;
  }

  async findByName(name: string, page: number): Promise<Gym[]> {
    const gym = prisma.gym.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
      take: 20,
      skip: (page - 1) * 20,
      orderBy: {
        created_at: "desc",
      },
    });

    return gym;
  }

  async findNearby(
    userLatitude: number,
    userLongitude: number
  ): Promise<Gym[]> {
    const gyms = await prisma.$queryRaw<Gym[]>`
      WHERE (6371 * acos(cos(radians(${userLatitude})) * cos(radians(latitude)) * cos(radians(longitude) - radians(${userLongitude})) + sin(radians(${userLatitude})) * sin(radians(latitude)))) < 10
    `; // 10km

    return gyms;
  }
}
