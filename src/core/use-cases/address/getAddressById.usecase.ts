import { IAddressEntity } from "../../entities";
import {
  IAddressFieldsValidationPort,
  IAddressRepositoryPort,
} from "../../ports";
import { IHttpResponse } from "../../types";
import { HttpResponseUtils } from "../../utils";
import { IDefaultUseCase } from "../default.usecase";

export class GetAddressByIdUseCase
  implements IDefaultUseCase<IHttpResponse, string>
{
  constructor(
    private addressRepositoryPort: IAddressRepositoryPort,
    private fieldsValidatorPort: IAddressFieldsValidationPort
  ) {}

  async execute(id: string): Promise<IHttpResponse<IAddressEntity>> {
    try {
      const validatedId = this.fieldsValidatorPort.validateById(id);

      const address = await this.addressRepositoryPort.getById(validatedId);

      if (!address) {
        return HttpResponseUtils.notFoundResponse();
      }

      return HttpResponseUtils.okResponse(address);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
