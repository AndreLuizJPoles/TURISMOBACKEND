import { randomUUID } from "crypto";
import { IAddressEntity } from "../../entities";
import {
  IAddressFieldsValidationPort,
  IAddressRepositoryPort,
} from "../../ports";
import {
  ICreateAddressRepositoryDataIn,
  ICreateAddressUseCaseDataIn,
  IHttpResponse,
} from "../../types";
import { HttpResponseUtils } from "../../utils";
import { IDefaultUseCase } from "../default.usecase";

export class CreateAddressUseCase
  implements IDefaultUseCase<IHttpResponse, ICreateAddressUseCaseDataIn>
{
  constructor(
    private addressRepositoryPort: IAddressRepositoryPort,
    private fieldsValidator: IAddressFieldsValidationPort
  ) {}

  async execute(
    data: ICreateAddressUseCaseDataIn
  ): Promise<IHttpResponse<IAddressEntity>> {
    try {
      const validatedFields = this.fieldsValidator.create(data);

      const { establishment_id, user_id } = validatedFields;

      const establishmentAddress = establishment_id
        ? await this.addressRepositoryPort.getByEstablishmentId(
            establishment_id
          )
        : null;

      const userAddress = user_id
        ? await this.addressRepositoryPort.getByUserId(user_id)
        : null;

      if (establishmentAddress || userAddress) {
        return HttpResponseUtils.badRequestResponse(
          "É permitido apenas um endereço por cadastro"
        );
      }

      const newAddressData: ICreateAddressRepositoryDataIn = {
        ...validatedFields,
        id: randomUUID(),
      };

      const address = await this.addressRepositoryPort.create(newAddressData);

      return HttpResponseUtils.createdResponse(address);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
