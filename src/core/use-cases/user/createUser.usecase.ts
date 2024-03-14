import { IUserEntity } from "../../entities";
import { IPasswordHashPort, IUserFieldsValidationPort, IUserRepositoryPort } from "../../ports";
import {
  IHttpResponse,
  ICreateUserRepositoryDataIn,
  ICreateUserUseCaseDataIn,
} from "../../types";
import { HttpResponseUtils, excludeFields } from "../../utils";
import { IDefaultUseCase } from "../default.usecase";
import crypto from "crypto";

export class CreateUserUseCase
  implements IDefaultUseCase<IHttpResponse, ICreateUserUseCaseDataIn>
{
  constructor(
    private userRepositoryPort: IUserRepositoryPort,
    private passwordHashPort: IPasswordHashPort,
    private fieldsValidatorPort: IUserFieldsValidationPort
  ) {}

  async execute(
    data: ICreateUserUseCaseDataIn
  ): Promise<IHttpResponse<IUserEntity>> {
    try {
      this.fieldsValidatorPort.create(data);

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
