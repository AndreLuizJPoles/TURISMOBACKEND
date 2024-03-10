import { IUserEntity } from "../../entities";
import { IUserRepositoryPort } from "../../ports/repository/user.repository";
import {
  IHttpResponse,
  ICreateUserRepositoryDataIn,
  ICreateUserServiceDataIn,
} from "../../types";
import { HttpResponseUtils } from "../../utils/httpResponse.utils";
import { IDefaultUseCase } from "../default.usecase";
import crypto from "crypto";

export class CreateUserUseCase
  implements IDefaultUseCase<IHttpResponse, ICreateUserServiceDataIn>
{
  constructor(private userRepositoryPort: IUserRepositoryPort) {}

  async execute(
    data: ICreateUserServiceDataIn
  ): Promise<IHttpResponse<IUserEntity[]>> {
    try {
      const id = crypto.randomUUID();

      const user_repository_data: ICreateUserRepositoryDataIn = {
        ...data,
        id,
      };

      const user = await this.userRepositoryPort.create(user_repository_data);

      if (!user) {
        return HttpResponseUtils.badRequestResponse();
      }

      return HttpResponseUtils.createdResponse(user);
    } catch (error) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
