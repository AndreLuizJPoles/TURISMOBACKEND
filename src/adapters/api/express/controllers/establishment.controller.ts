import { IEstablishmentEntity } from "../../../../core/entities";
import {
  ICreateEstablishmentUseCaseDataIn,
  IEstablishmentUseCases,
  IHttpResponse,
  ILoginUseCaseDataIn,
  IUpdateEstablishmentUseCaseDataIn,
} from "../../../../core/types";

export class EstablishmentController {
  constructor(private establishmentUseCases: IEstablishmentUseCases) {}

  async createEstablishment(
    data: ICreateEstablishmentUseCaseDataIn
  ): Promise<IHttpResponse<IEstablishmentEntity>> {
    return this.establishmentUseCases.createEstablishment.execute(data);
  }

  async getAllEstablishments(): Promise<IHttpResponse<IEstablishmentEntity[]>> {
    return this.establishmentUseCases.getAllEstablishments.execute();
  }

  async getEstablishmentById(
    id: string
  ): Promise<IHttpResponse<IEstablishmentEntity>> {
    return this.establishmentUseCases.getEstablishmentById.execute(id);
  }

  async updateEstablishment(
    data: IUpdateEstablishmentUseCaseDataIn
  ): Promise<IHttpResponse<IEstablishmentEntity>> {
    return this.establishmentUseCases.updateEstablishment.execute(data);
  }

  async deleteEstablishment(
    id: string
  ): Promise<IHttpResponse<IEstablishmentEntity>> {
    return this.establishmentUseCases.deleteEstablishment.execute(id);
  }

  async login(
    data: ILoginUseCaseDataIn
  ): Promise<IHttpResponse<IEstablishmentEntity>> {
    return this.establishmentUseCases.loginEstablishment.execute(data);
  }
}
