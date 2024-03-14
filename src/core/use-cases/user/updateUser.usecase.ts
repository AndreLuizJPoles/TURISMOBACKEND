import { IUserEntity } from "../../entities";
import { IUserFieldsValidationPort } from "../../ports/fieldsValidation";
import { IUserRepositoryPort } from "../../ports/repository";
import { IHttpResponse, IUpdateUserServiceDataIn } from "../../types";
import { excludeFields } from "../../utils";
import { HttpResponseUtils } from "../../utils/httpResponse.utils";
import { IDefaultUseCase } from "../default.usecase";
import zod from "zod";
export class UpdateUserUseCase
  implements IDefaultUseCase<IHttpResponse, IUpdateUserServiceDataIn>
{
  constructor(
    private userRepositoryPort: IUserRepositoryPort,
    private fieldsValidator: IUserFieldsValidationPort
  ) {}

  async execute(
    data: IUpdateUserServiceDataIn
  ): Promise<IHttpResponse<IUserEntity>> {
    try {
      this.fieldsValidator.update(data);

      const { id, ...userDataIn } = data;

      const user = await this.userRepositoryPort.update(id, userDataIn);

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
