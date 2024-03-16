import { IEstablishmentEntity } from "../../entities";
import {
  IEstablishmentFieldsValidationPort,
  IEstablishmentRepositoryPort,
} from "../../ports";
import { IHttpResponse } from "../../types";
import { HttpResponseUtils } from "../../utils";
import { IDefaultUseCase } from "../default.usecase";

export class DeleteEstablishmentUseCase
  implements IDefaultUseCase<IHttpResponse, string>
{
  constructor(
    private establishmentRepositoryPort: IEstablishmentRepositoryPort,
    private fieldsValidatorPort: IEstablishmentFieldsValidationPort
  ) {}

  async execute(id: string): Promise<IHttpResponse<IEstablishmentEntity>> {
    try {
      const validatedId = this.fieldsValidatorPort.delete(id);

      const establishment = await this.establishmentRepositoryPort.delete(validatedId);

      if (!establishment) {
        return HttpResponseUtils.notFoundResponse();
      }

      return HttpResponseUtils.okResponse(establishment);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
