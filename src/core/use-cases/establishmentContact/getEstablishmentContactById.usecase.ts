import { IEstablishmentContactEntity } from "../../entities";
import {
  IEstablishmentContactFieldsValidationPort,
  IEstablishmentContactRepositoryPort,
} from "../../ports";
import { IHttpResponse } from "../../types";
import { HttpResponseUtils } from "../../utils";
import { IDefaultUseCase } from "../default.usecase";

export class GetEstablishmentContactByIdUseCase
  implements IDefaultUseCase<IHttpResponse, string>
{
  constructor(
    private establishmentContactRepositoryPort: IEstablishmentContactRepositoryPort,
    private fieldsValidatorPort: IEstablishmentContactFieldsValidationPort
  ) {}

  async execute(
    id: string
  ): Promise<IHttpResponse<IEstablishmentContactEntity>> {
    try {
      const validatedId = this.fieldsValidatorPort.getById(id);

      const establishmentContact =
        await this.establishmentContactRepositoryPort.getById(validatedId);

      if (!establishmentContact) {
        return HttpResponseUtils.notFoundResponse();
      }

      return HttpResponseUtils.okResponse(establishmentContact);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
