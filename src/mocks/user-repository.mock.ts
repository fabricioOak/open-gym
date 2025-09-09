import { type User, type Prisma } from "@prisma/client";
import { type IUserRepository } from "@/repositories/user.repository";
import { randomUUID } from "node:crypto";

class UserRepositoryMock implements IUserRepository {
  public users: User[] = [];

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      legalName: data.legalName,
      socialName: data.socialName ?? null,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.users.push(user);

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);

    return user ?? null;
  }
  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    return user ?? null;
  }
}

export { UserRepositoryMock };
