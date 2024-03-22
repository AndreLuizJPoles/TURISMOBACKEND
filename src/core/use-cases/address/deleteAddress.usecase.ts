import { IAddressEntity } from "../../entities";
import { IAddressFieldsValidationPort, IAddressRepositoryPort} from "../../ports";
import { IHttpResponse } from "../../types";
import { HttpResponseUtils } from "../../utils";
import { IDefaultUseCase } from "../default.usecase";

export class DeleteAddressUseCase
  implements IDefaultUseCase<IHttpResponse, string>
{
  constructor(
    private addressRepositoryPort: IAddressRepositoryPort,
    private fieldsValidatorPort: IAddressFieldsValidationPort
  ) {}

  async execute(id: string): Promise<IHttpResponse<IAddressEntity>> {
    try {
      const validatedId = this.fieldsValidatorPort.validateById(id);

      const addressExists = await this.addressRepositoryPort.getById(validatedId);

      if (!addressExists) {
        return HttpResponseUtils.notFoundResponse();
      }

      const address = await this.addressRepositoryPort.delete(validatedId);

      return HttpResponseUtils.okResponse(address);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
