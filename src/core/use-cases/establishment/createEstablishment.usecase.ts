import { randomUUID } from "crypto";
import { IEstablishmentEntity } from "../../entities";
import {
  IAddressRepositoryPort,
  IEstablishmentFieldsValidationPort,
  IEstablishmentRepositoryPort,
  IEstablishmentWorkingTimeRepositoryPort,
} from "../../ports";
import {
  ICreateAddressRepositoryDataIn,
  ICreateEstablishmentRepositoryDataIn,
  ICreateEstablishmentUseCaseDataIn,
  ICreateEstablishmentWorkingTimeRepositoryDataIn,
  IHttpResponse,
} from "../../types";
import { HttpResponseUtils } from "../../utils";
import { IDefaultUseCase } from "../default.usecase";
import { loggedUser } from "../../utils/loggedUser.utils";

export class CreateEstablishmentUseCase
  implements IDefaultUseCase<IHttpResponse, ICreateEstablishmentUseCaseDataIn>
{
  constructor(
    private establishmentRepositoryPort: IEstablishmentRepositoryPort,
    private addressRepositoryPort: IAddressRepositoryPort,
    private establishmentWorkingTimeRepositoryPort: IEstablishmentWorkingTimeRepositoryPort,
    private fieldsValidatorPort: IEstablishmentFieldsValidationPort
  ) {}

  async execute(
    data: ICreateEstablishmentUseCaseDataIn
  ): Promise<IHttpResponse<IEstablishmentEntity>> {
    try {
      const validatedFields = this.fieldsValidatorPort.create(data);

      const { address, workingTime, ...establishmentData } = validatedFields;

      const newEstablishmentData: ICreateEstablishmentRepositoryDataIn = {
        ...establishmentData,
        id: randomUUID(),
        user_id: loggedUser.user!.id,
      };

      const establishment = await this.establishmentRepositoryPort.create(
        newEstablishmentData
      );

      if (!establishment) {
        return HttpResponseUtils.badRequestResponse();
      }

      const addressData: ICreateAddressRepositoryDataIn = {
        ...address,
        id: randomUUID(),
        establishment_id: establishment.id,
      };
      const establishmentWorkingTimeData: ICreateEstablishmentWorkingTimeRepositoryDataIn =
        {
          ...workingTime,
          id: randomUUID(),
          establishment_id: establishment.id,
        };

      await this.addressRepositoryPort.create(addressData);

      await this.establishmentWorkingTimeRepositoryPort.create(
        establishmentWorkingTimeData
      );

      return HttpResponseUtils.createdResponse(establishment);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
