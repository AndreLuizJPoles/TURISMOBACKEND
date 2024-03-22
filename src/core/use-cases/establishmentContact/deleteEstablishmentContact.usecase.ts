import { IEstablishmentContactEntity } from "../../entities";
import {
  IEstablishmentContactFieldsValidationPort,
  IEstablishmentContactRepositoryPort,
} from "../../ports";
import { IHttpResponse } from "../../types";
import { HttpResponseUtils } from "../../utils";
import { IDefaultUseCase } from "../default.usecase";

export class DeleteEstablishmentContactUseCase
  implements IDefaultUseCase<IHttpResponse, string>
{
  constructor(
    private establishmentContactRepositoryPort: IEstablishmentContactRepositoryPort,
    private fieldsValidatorPort: IEstablishmentContactFieldsValidationPort
  ) {}

  async execute(id: string): Promise<IHttpResponse<IEstablishmentContactEntity>> {
    try {
      const validatedId = this.fieldsValidatorPort.delete(id);

      const establishmentContactExists =
        await this.establishmentContactRepositoryPort.getById(validatedId);

      if (!establishmentContactExists) {
        return HttpResponseUtils.notFoundResponse();
      }

      const establishmentContact =
        await this.establishmentContactRepositoryPort.delete(validatedId);

      return HttpResponseUtils.okResponse(establishmentContact);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
