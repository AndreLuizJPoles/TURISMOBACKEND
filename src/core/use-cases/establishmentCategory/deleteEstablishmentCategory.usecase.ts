import { IEstablishmentCategoryEntity } from "../../entities";
import { IEstablishmentCategoryFieldsValidationPort } from "../../ports";
import { IEstablishmentCategoryRepositoryPort } from "../../ports/repository/establishmentCategory.port";
import { IHttpResponse } from "../../types";
import { HttpResponseUtils } from "../../utils";
import { IDefaultUseCase } from "../default.usecase";

export class DeleteEstablishmentCategoryUseCase
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
      const validatedId = this.fieldsValidatorPort.delete(id);

      const establishmentCategoryExists =
        await this.establishmentCategoryRepositoryPort.getById(validatedId);

      if (establishmentCategoryExists) {
        return HttpResponseUtils.badRequestResponse("Categoria não sexiste");
      }

      const establishmentCategory =
        await this.establishmentCategoryRepositoryPort.delete(validatedId);

      return HttpResponseUtils.okResponse(establishmentCategory);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
