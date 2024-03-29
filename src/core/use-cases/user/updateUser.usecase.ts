import { IUserEntity } from "../../entities";
import { IUserFieldsValidationPort, IUserRepositoryPort } from "../../ports";
import { IHttpResponse, IUpdateUserUseCaseDataIn } from "../../types";
import { excludeFields, HttpResponseUtils } from "../../utils";
import { IDefaultUseCase } from "../default.usecase";

export class UpdateUserUseCase
  implements IDefaultUseCase<IHttpResponse, IUpdateUserUseCaseDataIn>
{
  constructor(
    private userRepositoryPort: IUserRepositoryPort,
    private fieldsValidatorPort: IUserFieldsValidationPort
  ) {}

  async execute(
    data: IUpdateUserUseCaseDataIn
  ): Promise<IHttpResponse<IUserEntity>> {
    try {
      const validatedFields = this.fieldsValidatorPort.update(data);

      const { id, ...userDataIn } = validatedFields;

      const userExists = await this.userRepositoryPort.getById(id);

      if (!userExists) {
        return HttpResponseUtils.notFoundResponse();
      }

      const userData = userDataIn;

      if (userData.birthdate) {
        userData.birthdate = new Date(userData.birthdate);
      }

      const user = await this.userRepositoryPort.update(id, userData);

      const userDataFormatted = excludeFields(["password"], user);

      return HttpResponseUtils.okResponse(userDataFormatted);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
