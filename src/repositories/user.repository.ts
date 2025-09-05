import { type User, type Prisma } from "@prisma/client";
import { prisma } from "@/db/prisma";

export interface IUserRepository {
  createUser(data: Prisma.UserCreateInput): Promise<User>;
  checkUserExists(email: string): Promise<User | null>;
}

export class UserRepository implements IUserRepository {
  async createUser(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data });

    return user;
  }

  async checkUserExists(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
}
