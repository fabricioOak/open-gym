import { it, expect, describe, beforeEach } from "vitest";
import { GetUserUseCase } from "../getUser.useCase";
import * as argon from "argon2";
import { UserRepositoryMock } from "@/mocks/user-repository.mock";
import { ApiError } from "@/utils/apiError";

let userRepository: UserRepositoryMock;
let sut: GetUserUseCase;

describe("Retrieve an user", () => {
  beforeEach(() => {
    userRepository = new UserRepositoryMock();
    sut = new GetUserUseCase(userRepository);
  });

  it("should be able to find an user", async () => {
    const newUser = await userRepository.create({
      legalName: "John Doe",
      socialName: "Anthony Doe",
      email: "johndoe@example.com",
      password_hash: await argon.hash("123456"),
    });

    const { user } = await sut.execute({
      userId: newUser.id,
    });

    expect(user.id).toEqual(expect.any(String));
  });

  it("sould not be able to find an non-existent user", async () => {
    await expect(() =>
      sut.execute({
        userId: "non-existent-user-id",
      })
    ).rejects.toBeInstanceOf(ApiError);
  });
});
