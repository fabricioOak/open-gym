import { it, expect, describe, beforeEach } from "vitest";
import { CreateUserUseCase } from "../create.useCase";
import * as argon from "argon2";
import { UserRepositoryMock } from "@/mocks/user-repository.mock";
import { ApiError } from "@/utils/apiError";
import { type IUserRepository } from "@/repositories/user.repository";

let userRepository: IUserRepository;
let sut: CreateUserUseCase;

describe("Creates a new user", () => {
  beforeEach(() => {
    userRepository = new UserRepositoryMock();
    sut = new CreateUserUseCase(userRepository);
  });

  it("should be able to create a new user", async () => {
    const { user } = await sut.execute({
      legalName: "John Doe",
      socialName: "Anthony Doe",
      email: "iU4bF@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash the user password", async () => {
    const { user } = await sut.execute({
      legalName: "John Doe",
      socialName: "Anthony Doe",
      email: "iU4bF@example.com",
      password: "123456",
    });

    const isPasswordCorrectlyHashed = await argon.verify(
      user.password_hash,
      "123456"
    );

    expect(isPasswordCorrectlyHashed).toBe(true);
  });

  it("should not be able to create a user with an existing email", async () => {
    await sut.execute({
      legalName: "John Doe",
      socialName: "Anthony Doe",
      email: "iU4bF@example.com",
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        legalName: "John Doe",
        socialName: "Anthony Doe",
        email: "iU4bF@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(ApiError);
  });
});
