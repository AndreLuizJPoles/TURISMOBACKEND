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
    private establishmentCategoryPort: IEstablishmentCategoryRepositoryPort,
    private fieldsValidator: IEstablishmentCategoryFieldsValidationPort
  ) {}

  async execute(
    data: IUpdateEstablishmentCategoryUseCaseDataIn
  ): Promise<IHttpResponse<IEstablishmentCategoryEntity>> {
    try {
      const { id, ...establishmentCategoryData } =
        this.fieldsValidator.update(data);

      const establishmentCategory = await this.establishmentCategoryPort.update(
        id,
        establishmentCategoryData
      );

      if (!establishmentCategory) {
        return HttpResponseUtils.badRequestResponse();
      }

      return HttpResponseUtils.okResponse(establishmentCategory);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
