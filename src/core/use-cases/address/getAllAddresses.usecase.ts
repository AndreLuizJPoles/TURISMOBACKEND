import { IAddressEntity } from "../../entities";
import { IAddressRepositoryPort } from "../../ports";
import { IHttpResponse } from "../../types";
import { HttpResponseUtils } from "../../utils";
import { IDefaultUseCase } from "../default.usecase";

export class GetAllAddressesUseCase implements IDefaultUseCase<IHttpResponse> {
  constructor(private addressRepositoryPort: IAddressRepositoryPort) {}

  async execute(): Promise<IHttpResponse<IAddressEntity[]>> {
    try {
      const addresses = await this.addressRepositoryPort.getAll();

      if (!addresses.length) {
        return HttpResponseUtils.notFoundResponse();
      }

      return HttpResponseUtils.okResponse(addresses);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
