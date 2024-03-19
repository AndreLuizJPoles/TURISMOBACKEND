import { IEstablishmentEntity } from "../../entities";
import { IEstablishmentRepositoryPort } from "../../ports";
import { IHttpResponse } from "../../types";
import { HttpResponseUtils } from "../../utils";
import { IDefaultUseCase } from "../default.usecase";

export class GetAllEstablishmentsUseCase
  implements IDefaultUseCase<IHttpResponse>
{
  constructor(
    private establishmentRepositoryPort: IEstablishmentRepositoryPort
  ) {}

  async execute(): Promise<IHttpResponse<IEstablishmentEntity[]>> {
    try {
      const establishments = await this.establishmentRepositoryPort.getAll();

      if (!establishments.length) {
        return HttpResponseUtils.notFoundResponse();
      }

      return HttpResponseUtils.okResponse(establishments);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
