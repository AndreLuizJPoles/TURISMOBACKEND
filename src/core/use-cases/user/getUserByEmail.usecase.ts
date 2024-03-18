import { IUserEntity } from "../../entities";
import { IUserFieldsValidationPort, IUserRepositoryPort } from "../../ports";
import { IHttpResponse } from "../../types";
import { excludeFields, HttpResponseUtils } from "../../utils";
import { IDefaultUseCase } from "../default.usecase";

export class GetUserByEmailUseCase
  implements IDefaultUseCase<IHttpResponse, string>
{
  constructor(
    private userRepositoryPort: IUserRepositoryPort,
    private fieldsValidatorPort: IUserFieldsValidationPort
  ) {}

  async execute(email: string): Promise<IHttpResponse<IUserEntity>> {
    try {
      this.fieldsValidatorPort.getByEmail(email);

      const user = await this.userRepositoryPort.getByEmail(email);

      if (!user) {
        return HttpResponseUtils.notFoundResponse();
      }

      const userDataFormatted = excludeFields(["password"], user);

      return HttpResponseUtils.okResponse(userDataFormatted);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
