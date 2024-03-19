import { randomUUID } from "crypto";
import { IEstablishmentCategoryEntity } from "../../entities";
import { IEstablishmentCategoryRepositoryPort } from "../../ports/repository/establishmentCategory.port";
import {
  ICreateEstablishmentCategoryRepositoryDataIn,
  ICreateEstablishmentCategoryUseCaseDataIn,
  IHttpResponse,
} from "../../types";
import { HttpResponseUtils } from "../../utils";
import { IDefaultUseCase } from "../default.usecase";
import { IEstablishmentCategoryFieldsValidationPort } from "../../ports";

export class CreateEstablishmentCategoryUseCase
  implements
    IDefaultUseCase<IHttpResponse, ICreateEstablishmentCategoryUseCaseDataIn>
{
  constructor(
    private establishmentCategoryRepositoryPort: IEstablishmentCategoryRepositoryPort,
    private fieldsValidation: IEstablishmentCategoryFieldsValidationPort
  ) {}

  async execute(
    data: ICreateEstablishmentCategoryUseCaseDataIn
  ): Promise<IHttpResponse<IEstablishmentCategoryEntity>> {
    try {
      const validatedFields = this.fieldsValidation.create(data);

      const establishmentCategoryData: ICreateEstablishmentCategoryRepositoryDataIn =
        {
          ...validatedFields,
          id: randomUUID(),
        };

      const establishmentCategory =
        await this.establishmentCategoryRepositoryPort.create(
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
