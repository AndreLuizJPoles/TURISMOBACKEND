import { randomUUID } from "crypto";
import { IEstablishmentEntity } from "../../entities";
import {
  IAddressRepositoryPort,
  IEstablishmentContactRepositoryPort,
  IEstablishmentFieldsValidationPort,
  IEstablishmentRepositoryPort,
  IEstablishmentWorkingTimeRepositoryPort,
} from "../../ports";
import {
  ICreateAddressRepositoryDataIn,
  ICreateEstablishmentContactRepositoryDataIn,
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
    private establishmentContactRepositoryPort: IEstablishmentContactRepositoryPort,
    private fieldsValidatorPort: IEstablishmentFieldsValidationPort
  ) {}

  async execute(
    data: ICreateEstablishmentUseCaseDataIn
  ): Promise<IHttpResponse<IEstablishmentEntity>> {
    try {
      const validatedFields = this.fieldsValidatorPort.create(data);

      const { address, workingTime, contacts, ...establishmentData } =
        validatedFields;

      const establishmentExists =
        await this.establishmentRepositoryPort.getByCNPJ(
          establishmentData.cnpj
        );

      if (establishmentExists) {
        return HttpResponseUtils.badRequestResponse(
          "Estabelecimento já existe"
        );
      }

      const newEstablishmentData: ICreateEstablishmentRepositoryDataIn = {
        ...establishmentData,
        id: randomUUID(),
        user_id: loggedUser.user!.id,
      };

      const establishment = await this.establishmentRepositoryPort.create(
        newEstablishmentData
      );

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

      const contactData: ICreateEstablishmentContactRepositoryDataIn[] = [];

      contacts.emails.forEach((email) =>
        contactData.push({
          id: randomUUID(),
          establishment_id: establishment.id,
          email,
        })
      );
      contacts.phone_numbers.forEach((phone_number) =>
        contactData.push({
          id: randomUUID(),
          establishment_id: establishment.id,
          phone_number,
        })
      );

      await this.establishmentContactRepositoryPort.createMany(contactData);

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
