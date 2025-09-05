import { it, expect, describe } from "vitest";
import { CreateUserUseCase } from "./create.useCase";
import * as argon from "argon2";
import { UserRepositoryMock } from "@/mocks/user-repository.mock";
import { ApiError } from "@/utils/apiError";

describe("Creates a new user", () => {
  it("should be able to create a new user", async () => {
    const userRepository = new UserRepositoryMock();
    const createUserUseCase = new CreateUserUseCase(userRepository);

    const { user } = await createUserUseCase.execute({
      legalName: "John Doe",
      socialName: "Anthony Doe",
      email: "iU4bF@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should hash the user password", async () => {
    const userRepository = new UserRepositoryMock();
    const createUserUseCase = new CreateUserUseCase(userRepository);

    const { user } = await createUserUseCase.execute({
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
    const userRepository = new UserRepositoryMock();
    const createUserUseCase = new CreateUserUseCase(userRepository);

    await createUserUseCase.execute({
      legalName: "John Doe",
      socialName: "Anthony Doe",
      email: "iU4bF@example.com",
      password: "123456",
    });

    await expect(() =>
      createUserUseCase.execute({
        legalName: "John Doe",
        socialName: "Anthony Doe",
        email: "iU4bF@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(ApiError);
  });
});
