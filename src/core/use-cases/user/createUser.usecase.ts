import { IUserEntity } from "../../entities";
import { IPasswordHashPort } from "../../ports";
import { IUserFieldsValidationPort } from "../../ports/fieldsValidation";
import { IUserRepositoryPort } from "../../ports/repository";
import {
  IHttpResponse,
  ICreateUserRepositoryDataIn,
  ICreateUserServiceDataIn,
} from "../../types";
import { HttpResponseUtils, excludeFields } from "../../utils";
import { IDefaultUseCase } from "../default.usecase";
import crypto from "crypto";

export class CreateUserUseCase
  implements IDefaultUseCase<IHttpResponse, ICreateUserServiceDataIn>
{
  constructor(
    private userRepositoryPort: IUserRepositoryPort,
    private passwordHashPort: IPasswordHashPort,
    private fieldsValidator: IUserFieldsValidationPort
  ) {}

  async execute(
    data: ICreateUserServiceDataIn
  ): Promise<IHttpResponse<IUserEntity>> {
    try {
      this.fieldsValidator.create(data);

      const id = crypto.randomUUID();
      const hashed_password = await this.passwordHashPort.hash(data.password);

      const user_repository_data: ICreateUserRepositoryDataIn = {
        ...data,
        password: hashed_password,
        id,
      };

      const user = await this.userRepositoryPort.create(user_repository_data);

      if (!user) {
        return HttpResponseUtils.badRequestResponse();
      }

      const userDataFormatted = excludeFields(["password"], user);

      return HttpResponseUtils.createdResponse(userDataFormatted);
    } catch (error: any) {
      console.log(error)
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
