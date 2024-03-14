import { IUserEntity } from "../../entities";
import { IUserFieldsValidationPort } from "../../ports/fieldsValidation";
import { IUserRepositoryPort } from "../../ports/repository";
import { IHttpResponse } from "../../types";
import { excludeFields } from "../../utils";
import { HttpResponseUtils } from "../../utils/httpResponse.utils";
import { IDefaultUseCase } from "../default.usecase";
import zod from "zod";

export class GetUserByEmailUseCase
  implements IDefaultUseCase<IHttpResponse, string>
{
  constructor(
    private userRepositoryPort: IUserRepositoryPort,
    private fieldsValidator: IUserFieldsValidationPort
  ) {}

  async execute(email: string): Promise<IHttpResponse<IUserEntity>> {
    try {
      this.fieldsValidator.getByEmail(email);

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
