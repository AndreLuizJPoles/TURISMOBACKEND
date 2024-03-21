import { IAddressUseCases } from "../../core/types";
import { CreateAddressUseCase } from "../../core/use-cases/address";
import { AddressController } from "../api/express/controllers/address.controller";
import { AddressRepositoryAdapter } from "../database/prisma";
import { IAddressAssembler } from "../types/address.types";
import { AddressAPIFieldsValidationAdapter } from "../utils/apiFieldsValidation/addressFieldsValidation.adapter";

export const addressAssembler = (): IAddressAssembler => {
  const addressRepository = new AddressRepositoryAdapter();

  const addressFieldsValidator = new AddressAPIFieldsValidationAdapter();

  const addressUseCases: IAddressUseCases = {
    createAddress: new CreateAddressUseCase(
      addressRepository,
      addressFieldsValidator
    ),
  };

  const addressController = new AddressController(addressUseCases);

  return {
    addressController,
    addressRepository,
  };
};
