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

      const establishmentContactExists =
        await this.establishmentContactRepositoryPort.getById(id);

      if (!establishmentContactExists) {
        return HttpResponseUtils.notFoundResponse();
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
