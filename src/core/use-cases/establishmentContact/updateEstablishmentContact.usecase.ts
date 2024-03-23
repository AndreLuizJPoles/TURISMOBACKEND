import { IEstablishmentContactEntity } from "../../entities";
import {
  IEstablishmentContactFieldsValidationPort,
  IEstablishmentContactRepositoryPort,
} from "../../ports";
import {
  IHttpResponse,
  IUpdateEstablishmentContactUseCaseDataIn,
} from "../../types";
import { HttpResponseUtils } from "../../utils";
import { IDefaultUseCase } from "../default.usecase";

export class UpdateEstablishmentContactUseCase
  implements
    IDefaultUseCase<IHttpResponse, IUpdateEstablishmentContactUseCaseDataIn>
{
  constructor(
    private establishmentContactRepositoryPort: IEstablishmentContactRepositoryPort,
    private fieldsValidatorPort: IEstablishmentContactFieldsValidationPort
  ) {}

  async execute(
    data: IUpdateEstablishmentContactUseCaseDataIn
  ): Promise<IHttpResponse<IEstablishmentContactEntity>> {
    try {
      const { id, ...establishmentContactData } =
        this.fieldsValidatorPort.update(data);

      if (
        establishmentContactData.email &&
        establishmentContactData.phone_number
      ) {
        return HttpResponseUtils.badRequestResponse(
          "Atualize apenas o email ou o número de telefone"
        );
      }

      const establishmentContactExists =
        await this.establishmentContactRepositoryPort.getById(id);

      if (!establishmentContactExists) {
        return HttpResponseUtils.notFoundResponse();
      }

      if (establishmentContactExists.email && !establishmentContactData.email) {
        return HttpResponseUtils.badRequestResponse("Atualize apenas o email");
      }

      if (
        establishmentContactExists.phone_number &&
        !establishmentContactData.phone_number
      ) {
        return HttpResponseUtils.badRequestResponse(
          "Atualize apenas o número de telefone"
        );
      }

      const establishment =
        await this.establishmentContactRepositoryPort.update(
          id,
          establishmentContactData
        );

      return HttpResponseUtils.okResponse(establishment);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
