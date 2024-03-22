import { IEstablishmentContactEntity } from "../../../../core/entities";
import {
  IEstablishmentContactUseCases,
  IHttpResponse,
  IUpdateEstablishmentContactUseCaseDataIn,
} from "../../../../core/types";

export class EstablishmentContactController {
  constructor(
    private establishmentContactUseCases: IEstablishmentContactUseCases
  ) {}

  async getEstablishmentContactById(
    id: string
  ): Promise<IHttpResponse<IEstablishmentContactEntity>> {
    return this.establishmentContactUseCases.getEstablishmentContactById.execute(
      id
    );
  }

  async getEstablishmentContactByEstablishmentId(
    establishment_id: string
  ): Promise<IHttpResponse<IEstablishmentContactEntity>> {
    return this.establishmentContactUseCases.getEstablishmentContactById.execute(
      establishment_id
    );
  }

  async updateEstablishmentContact(
    data: IUpdateEstablishmentContactUseCaseDataIn
  ): Promise<IHttpResponse<IEstablishmentContactEntity>> {
    return this.establishmentContactUseCases.updateEstablishmentContact.execute(
      data
    );
  }

  async deleteEstablishmentContact(
    id: string
  ): Promise<IHttpResponse<IEstablishmentContactEntity>> {
    return this.establishmentContactUseCases.deleteEstablishmentContact.execute(
      id
    );
  }
}
