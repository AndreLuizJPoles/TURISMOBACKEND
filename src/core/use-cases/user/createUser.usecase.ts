import { IUserEntity } from "../../entities";
import {
  IPasswordHashPort,
  IUserFieldsValidationPort,
  IUserRepositoryPort,
} from "../../ports";
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
      const validatedFields = this.fieldsValidatorPort.create(data);

      const userExists = await this.userRepositoryPort.getByEmail(
        validatedFields.email
      );

      if (userExists) {
        return HttpResponseUtils.badRequestResponse();
      }

      const id = crypto.randomUUID();
      const hashedPassword = await this.passwordHashPort.hash(
        validatedFields.password
      );

      const user_repository_data: ICreateUserRepositoryDataIn = {
        ...validatedFields,
        password: hashedPassword,
        id,
        birthdate: new Date(validatedFields.birthdate),
      };

      const user = await this.userRepositoryPort.create(user_repository_data);

      if (!user) {
        return HttpResponseUtils.badRequestResponse();
      }

      const userDataFormatted = excludeFields(["password"], user);

      return HttpResponseUtils.createdResponse(userDataFormatted);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
