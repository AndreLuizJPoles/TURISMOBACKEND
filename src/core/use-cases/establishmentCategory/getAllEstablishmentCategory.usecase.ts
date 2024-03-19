import { IEstablishmentCategoryEntity } from "../../entities";
import { IEstablishmentCategoryRepositoryPort } from "../../ports/repository/establishmentCategory.port";
import { IHttpResponse } from "../../types";
import { HttpResponseUtils } from "../../utils";
import { IDefaultUseCase } from "../default.usecase";

export class GetAllEstablishmentCategoriesUseCase
  implements IDefaultUseCase<IHttpResponse>
{
  constructor(
    private establishmentCategoryRepositoryPort: IEstablishmentCategoryRepositoryPort
  ) {}

  async execute(): Promise<IHttpResponse<IEstablishmentCategoryEntity[]>> {
    try {
      const establishmentCategories =
        await this.establishmentCategoryRepositoryPort.getAll();

      if (!establishmentCategories.length) {
        return HttpResponseUtils.notFoundResponse();
      }

      return HttpResponseUtils.okResponse(establishmentCategories);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
