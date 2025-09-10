export interface IAuthRepository {
  login(email: string, password: string): Promise<string>;
}

export class AuthRepository implements IAuthRepository {
  login(email: string, password: string): Promise<string> {
    return Promise.resolve("token");
  }
}
