import { IUserEntity } from "../../../../../core/entities";
import {
  ICreateUserUseCaseDataIn,
  IHttpResponse,
  IUpdateUserUseCaseDataIn,
  IUserUseCases,
} from "../../../../../core/types";

export class UserController {
  constructor(private userUseCases: IUserUseCases) {}

  async createUser(
    data: ICreateUserUseCaseDataIn
  ): Promise<IHttpResponse<IUserEntity>> {
    return this.userUseCases.createUser.execute(data);
  }

  async getAllUsers(): Promise<IHttpResponse<IUserEntity[]>> {
    return this.userUseCases.getAllUsers.execute();
  }

  async getUserByEmail(email: string): Promise<IHttpResponse<IUserEntity>> {
    return this.userUseCases.getUserByEmail.execute(email);
  }

  async getUserById(id: string): Promise<IHttpResponse<IUserEntity>> {
    return this.userUseCases.getUserById.execute(id);
  }

  async updateUser(
    data: IUpdateUserUseCaseDataIn
  ): Promise<IHttpResponse<IUserEntity>> {
    return this.userUseCases.updateUser.execute(data);
  }

  async deleteUser(id: string): Promise<IHttpResponse<IUserEntity>> {
    return this.userUseCases.deleteUser.execute(id);
  }
}
