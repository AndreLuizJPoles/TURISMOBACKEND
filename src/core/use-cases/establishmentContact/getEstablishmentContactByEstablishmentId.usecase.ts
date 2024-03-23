import { IEstablishmentContactEntity } from "../../entities";
import { IEstablishmentContactFieldsValidationPort, IEstablishmentContactRepositoryPort } from "../../ports";
import { IHttpResponse } from "../../types";
import { HttpResponseUtils } from "../../utils";
import { IDefaultUseCase } from "../default.usecase";

export class GetEstablishmentContactsByEstablishmentIdUseCase
  implements IDefaultUseCase<IHttpResponse, string>
{
  constructor(
    private establishmentContactRepositoryPort: IEstablishmentContactRepositoryPort,
    private fieldsValidatorPort: IEstablishmentContactFieldsValidationPort
  ) {}

  async execute(establishment_id: string): Promise<IHttpResponse<IEstablishmentContactEntity>> {
    try {
      const validatedId = this.fieldsValidatorPort.validateById(establishment_id);

      const establishmentContacts = await this.establishmentContactRepositoryPort.getByEstablishmentId(validatedId);

      if (!establishmentContacts.length) {
        return HttpResponseUtils.notFoundResponse();
      }

      return HttpResponseUtils.okResponse(establishmentContacts);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}