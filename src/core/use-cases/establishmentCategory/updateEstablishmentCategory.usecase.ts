import { IEstablishmentCategoryEntity } from "../../entities";
import { IEstablishmentCategoryFieldsValidationPort } from "../../ports";
import { IEstablishmentCategoryRepositoryPort } from "../../ports/repository/establishmentCategory.port";
import {
  IHttpResponse,
  IUpdateEstablishmentCategoryUseCaseDataIn,
} from "../../types";
import { HttpResponseUtils } from "../../utils";
import { IDefaultUseCase } from "../default.usecase";

export class UpdateEstablishmentCategoryUseCase
  implements
    IDefaultUseCase<IHttpResponse, IUpdateEstablishmentCategoryUseCaseDataIn>
{
  constructor(
    private establishmentCategoryRepositoryPort: IEstablishmentCategoryRepositoryPort,
    private fieldsValidator: IEstablishmentCategoryFieldsValidationPort
  ) {}

  async execute(
    data: IUpdateEstablishmentCategoryUseCaseDataIn
  ): Promise<IHttpResponse<IEstablishmentCategoryEntity>> {
    try {
      const { id, ...establishmentCategoryData } =
        this.fieldsValidator.update(data);

      const establishmentCategoryExists =
        await this.establishmentCategoryRepositoryPort.getById(id);

      if (establishmentCategoryExists) {
        return HttpResponseUtils.badRequestResponse("Categoria não sexiste");
      }

      const establishmentCategory = await this.establishmentCategoryRepositoryPort.update(
        id,
        establishmentCategoryData
      );

      return HttpResponseUtils.okResponse(establishmentCategory);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
