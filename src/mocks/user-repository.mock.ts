import { type User, type Prisma } from "@prisma/client";
import { type IUserRepository } from "@/repositories/user.repository";

class UserRepositoryMock implements IUserRepository {
  public users: User[] = [];

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: "user-1",
      legalName: data.legalName,
      socialName: data.socialName ?? null,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    };

    this.users.push(user);

    return user;
  }

  async checkUserExists(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
}

export { UserRepositoryMock };
