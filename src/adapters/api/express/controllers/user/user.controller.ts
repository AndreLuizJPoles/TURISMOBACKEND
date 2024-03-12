import { IUserEntity } from "../../../../../core/entities";
import {
  ICreateUserServiceDataIn,
  IHttpResponse,
  IUpdateUserServiceDataIn,
  IUserUseCases,
} from "../../../../../core/types";

export class UserController {
  constructor(private userUseCases: IUserUseCases) {}

  async createUser(
    data: ICreateUserServiceDataIn
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
    data: IUpdateUserServiceDataIn
  ): Promise<IHttpResponse<IUserEntity>> {
    return this.userUseCases.updateUser.execute(data);
  }

  async deleteUser(id: string): Promise<IHttpResponse<IUserEntity>> {
    return this.userUseCases.deleteUser.execute(id);
  }
}