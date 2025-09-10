import { type IGymRepository } from "@/repositories/gym.repository";
import { getDistanceBetweenCoordinates } from "@/utils/getDistanceBetweenCoordinates";
import { Prisma, type Gym } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/client";
import { randomUUID } from "node:crypto";

export class GymRepositoryMock implements IGymRepository {
  public items: Gym[] = [];

  gym1: Gym = {
    id: "gym-01",
    name: "JavaScript Gym",
    description: null,
    phone: null,
    latitude: Decimal(-7.1427491),
    longitude: Decimal(34.9337651),
    created_at: new Date(),
  };

  gym2: Gym = {
    id: "gym-02",
    name: "TypeScript Gym",
    description: null,
    phone: null,
    latitude: Decimal(0),
    longitude: Decimal(0),
    created_at: new Date(),
  };

  nearGym: Gym = {
    id: "gym-03",
    name: "Near Gym",
    description: null,
    phone: null,
    latitude: new Decimal(-7.5628074),
    longitude: new Decimal(-35.0084014),
    created_at: new Date(),
  };

  farGym: Gym = {
    id: "gym-04",
    name: "Far Gym",
    description: null,
    phone: null,
    latitude: Decimal(-7.8573134),
    longitude: Decimal(-35.6546149),
    created_at: new Date(),
  };

  constructor() {
    this.items.push(this.gym1, this.gym2, this.nearGym, this.farGym);
  }
  async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    };

    this.items.push(gym);

    return gym;
  }

  async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((gym) => gym.id === id);

    if (!gym) {
      return null;
    }

    return gym;
  }

  async findByName(name: string, page: number): Promise<Gym[]> {
    return this.items
      .filter((gym) => gym.name.includes(name))
      .slice((page - 1) * 20, page * 20);
  }

  async findNearby(
    userLatitude: number,
    userLongitude: number
  ): Promise<Gym[]> {
    return this.items.filter((gym) => {
      const distance = getDistanceBetweenCoordinates(
        { latitude: userLatitude, longitude: userLongitude },
        {
          latitude: gym.latitude.toNumber(),
          longitude: gym.longitude.toNumber(),
        }
      );

      const NEARBY_DISTANCE_IN_KM = 10;

      return distance < NEARBY_DISTANCE_IN_KM;
    });
  }
}
