import { it, expect, describe, beforeEach } from "vitest";
import { LoginUseCase } from "../login.useCase";
import * as argon from "argon2";
import { UserRepositoryMock } from "@/mocks/user-repository.mock";
import { ApiError } from "@/utils/apiError";

let userRepository: UserRepositoryMock;
let sut: LoginUseCase;

describe("User login", () => {
  beforeEach(() => {
    userRepository = new UserRepositoryMock();
    sut = new LoginUseCase(userRepository);
  });

  it("should be able to login", async () => {
    const newUser = await userRepository.createUser({
      legalName: "John Doe",
      socialName: "Anthony Doe",
      email: "johndoe@example.com",
      password_hash: await argon.hash("123456"),
    });

    const { user } = await sut.execute({
      email: newUser.email,
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able to login with wrong credentials", async () => {
    expect(() =>
      sut.execute({
        email: "johndoe@example.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(ApiError);
  });
});
