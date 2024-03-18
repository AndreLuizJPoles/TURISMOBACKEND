import { IEstablishmentCategoryEntity } from "../../../../core/entities";
import {
  ICreateEstablishmentCategoryUseCaseDataIn,
  IEstablishmentCategoryUseCases,
  IHttpResponse,
  IUpdateEstablishmentCategoryUseCaseDataIn,
} from "../../../../core/types";

export class EstablishmentCategoryController {
  constructor(
    private establishmentCategoryUseCases: IEstablishmentCategoryUseCases
  ) {}

  async createEstablishmentCategory(
    data: ICreateEstablishmentCategoryUseCaseDataIn
  ): Promise<IHttpResponse<IEstablishmentCategoryEntity>> {
    return this.establishmentCategoryUseCases.createEstablishmentCategory.execute(
      data
    );
  }

  async getAllEstablishmentCategories(): Promise<
    IHttpResponse<IEstablishmentCategoryEntity[]>
  > {
    return this.establishmentCategoryUseCases.getAllEstablishmentCategories.execute();
  }

  async getEstablishmentCategoryById(
    id: string
  ): Promise<IHttpResponse<IEstablishmentCategoryEntity>> {
    return this.establishmentCategoryUseCases.getEstablishmentCategoryById.execute(
      id
    );
  }

  async updateEstablishmentCategory(
    data: IUpdateEstablishmentCategoryUseCaseDataIn
  ): Promise<IHttpResponse<IEstablishmentCategoryEntity>> {
    return this.establishmentCategoryUseCases.updateEstablishmentCategory.execute(
      data
    );
  }

  async deleteEstablishmentCategory(
    id: string
  ): Promise<IHttpResponse<IEstablishmentCategoryEntity>> {
    return this.establishmentCategoryUseCases.deleteEstablishmentCategory.execute(
      id
    );
  }
}
