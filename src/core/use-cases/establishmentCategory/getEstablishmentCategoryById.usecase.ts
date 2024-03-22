import { IEstablishmentCategoryEntity } from "../../entities";
import { IEstablishmentCategoryFieldsValidationPort } from "../../ports";
import { IEstablishmentCategoryRepositoryPort } from "../../ports/repository/establishmentCategory.port";
import { IHttpResponse } from "../../types";
import { HttpResponseUtils } from "../../utils";
import { IDefaultUseCase } from "../default.usecase";

export class GetEstablishmentCategoryByIdUseCase
  implements IDefaultUseCase<IHttpResponse, string>
{
  constructor(
    private establishmentCategoryRepositoryPort: IEstablishmentCategoryRepositoryPort,
    private fieldsValidatorPort: IEstablishmentCategoryFieldsValidationPort
  ) {}

  async execute(
    id: string
  ): Promise<IHttpResponse<IEstablishmentCategoryEntity>> {
    try {
      const validatedId = this.fieldsValidatorPort.validateById(id);

      const establishmentCategory =
        await this.establishmentCategoryRepositoryPort.getById(validatedId);

      if (!establishmentCategory) {
        return HttpResponseUtils.notFoundResponse();
      }

      return HttpResponseUtils.okResponse(establishmentCategory);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
