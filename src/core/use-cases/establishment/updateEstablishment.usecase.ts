import { IEstablishmentEntity } from "../../entities";
import {
  IAddressRepositoryPort,
  IEstablishmentRepositoryPort,
  IEstablishmentWorkingTimeRepositoryPort,
} from "../../ports";
import { IHttpResponse, IUpdateEstablishmentUseCaseDataIn } from "../../types";
import { HttpResponseUtils } from "../../utils";
import { IDefaultUseCase } from "../default.usecase";

export class UpdateEstablishmentUseCase
  implements IDefaultUseCase<IHttpResponse, IUpdateEstablishmentUseCaseDataIn>
{
  constructor(
    private establishmentRepositoryPort: IEstablishmentRepositoryPort,
    private addressRepositoryPort: IAddressRepositoryPort,
    private establishmentWorkingTimeRepositoryPort: IEstablishmentWorkingTimeRepositoryPort
  ) {}

  async execute(
    data: IUpdateEstablishmentUseCaseDataIn
  ): Promise<IHttpResponse<IEstablishmentEntity>> {
    try {
      const { address, workingTime, id, ...establishmentData } = data;

      const establishment = await this.establishmentRepositoryPort.update(
        id,
        establishmentData
      );

      if (!establishment) {
        return HttpResponseUtils.badRequestResponse();
      }

      if (address) {
        const { id, ...addressData } = address;

        await this.addressRepositoryPort.update(id, addressData);
      }

      if (workingTime) {
        const { id, ...workingTimeData } = workingTime;

        await this.establishmentWorkingTimeRepositoryPort.update(
          id,
          workingTimeData
        );
      }

      return HttpResponseUtils.okResponse(establishment);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
