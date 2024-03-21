import { IAddressEntity } from "../../entities";
import {
  IAddressFieldsValidationPort,
  IAddressRepositoryPort,
} from "../../ports";
import { IHttpResponse, IUpdateAddressUseCaseDataIn } from "../../types";
import { HttpResponseUtils } from "../../utils";
import { IDefaultUseCase } from "../default.usecase";

export class UpdateAddressUseCase
  implements IDefaultUseCase<IHttpResponse, IUpdateAddressUseCaseDataIn>
{
  constructor(
    private addressRepositoryPort: IAddressRepositoryPort,
    private fieldsValidatorPort: IAddressFieldsValidationPort
  ) {}

  async execute(
    data: IUpdateAddressUseCaseDataIn
  ): Promise<IHttpResponse<IAddressEntity>> {
    try {
      const validatedFields = this.fieldsValidatorPort.update(data);

      const { id, ...addressData } = validatedFields;

      const addressExists = await this.addressRepositoryPort.getById(id);

      if (!addressExists) {
        return HttpResponseUtils.notFoundResponse();
      }

      const address = await this.addressRepositoryPort.update(id, addressData);

      return HttpResponseUtils.okResponse(address);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
