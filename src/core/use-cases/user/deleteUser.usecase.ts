import { IUserEntity } from "../../entities";
import { IUserFieldsValidationPort, IUserRepositoryPort } from "../../ports";
import { IHttpResponse } from "../../types";
import { excludeFields, HttpResponseUtils } from "../../utils";
import { IDefaultUseCase } from "../default.usecase";

export class DeleteUserUseCase
  implements IDefaultUseCase<IHttpResponse, string>
{
  constructor(
    private userRepositoryPort: IUserRepositoryPort,
    private fieldsValidatorPort: IUserFieldsValidationPort
  ) {}

  async execute(id: string): Promise<IHttpResponse<IUserEntity>> {
    try {
      const validatedId = this.fieldsValidatorPort.delete(id);

      const user = await this.userRepositoryPort.delete(validatedId);

      if (!user) {
        return HttpResponseUtils.badRequestResponse();
      }

      const userDataFormatted = excludeFields(["password"], user);

      return HttpResponseUtils.okResponse(userDataFormatted);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
