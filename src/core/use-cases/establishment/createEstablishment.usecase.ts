import { randomUUID } from "crypto";
import { IEstablishmentEntity } from "../../entities";
import {
  IAddressRepositoryPort,
  IEstablishmentFieldsValidationPort,
  IEstablishmentRepositoryPort,
  IEstablishmentWorkingTimeRepositoryPort,
  IPasswordHashPort,
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

export class CreateEstablishmentUseCase
  implements IDefaultUseCase<IHttpResponse, ICreateEstablishmentUseCaseDataIn>
{
  constructor(
    private establishmentRepositoryPort: IEstablishmentRepositoryPort,
    private addressRepositoryPort: IAddressRepositoryPort,
    private establishmentWorkingTimeRepositoryPort: IEstablishmentWorkingTimeRepositoryPort,
    private fieldsValidatorPort: IEstablishmentFieldsValidationPort,
    private passwordHashPort: IPasswordHashPort
  ) {}

  async execute(
    data: ICreateEstablishmentUseCaseDataIn
  ): Promise<IHttpResponse<IEstablishmentEntity>> {
    try {
      this.fieldsValidatorPort.create(data);

      const { address, workingTime, ...establishmentData } = data;

      const hashedPasword = await this.passwordHashPort.hash(establishmentData.password);

      const newEstablishmentData: ICreateEstablishmentRepositoryDataIn = {
        ...establishmentData,
        id: randomUUID(),
        password: hashedPasword
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
