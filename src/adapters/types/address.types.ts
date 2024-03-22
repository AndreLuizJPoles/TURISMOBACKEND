import { AddressController } from "../api/express/controllers/address.controller";
import { AddressRepositoryAdapter } from "../database/prisma";

export interface IAddressAssembler {
  addressController: AddressController;
  addressRepository: AddressRepositoryAdapter;
}
