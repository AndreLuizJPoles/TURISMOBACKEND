import { IAddressEntity } from "../../../../core/entities";
import { IAddressUseCases, ICreateAddressUseCaseDataIn, IHttpResponse } from "../../../../core/types";

export class AddressController {
    constructor(private addressUseCases: IAddressUseCases) {}

    async createAddress(data: ICreateAddressUseCaseDataIn): Promise<IHttpResponse<IAddressEntity>> {
        return this.addressUseCases.createAddress.execute(data)
    }
}