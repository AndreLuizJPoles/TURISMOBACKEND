import { IAddressEntity } from "../../../../core/entities";
import {
  IAddressUseCases,
  ICreateAddressUseCaseDataIn,
  IHttpResponse,
  IUpdateAddressUseCaseDataIn,
} from "../../../../core/types";

export class AddressController {
  constructor(private addressUseCases: IAddressUseCases) {}

  async createAddress(
    data: ICreateAddressUseCaseDataIn
  ): Promise<IHttpResponse<IAddressEntity>> {
    return this.addressUseCases.createAddress.execute(data);
  }

  async getAllAddresses(): Promise<IHttpResponse<IAddressEntity[]>> {
    return this.addressUseCases.getAllAddresses.execute();
  }

  async updateAddress(
    data: IUpdateAddressUseCaseDataIn
  ): Promise<IHttpResponse<IAddressEntity>> {
    return this.addressUseCases.updateAddress.execute(data);
  }

  async deleteAddress(id: string): Promise<IHttpResponse<IAddressEntity>> {
    return this.addressUseCases.deleteAddress.execute(id);
  }

  async getAddressById(id: string): Promise<IHttpResponse<IAddressEntity>> {
    return this.addressUseCases.getAddressById.execute(id);
  }
}
