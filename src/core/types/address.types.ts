import { IAddressEntity, IEstablishmentEntity } from "../entities";
import {
  CreateAddressUseCase,
  DeleteAddressUseCase,
  GetAddressByIdUseCase,
  GetAllAddressesUseCase,
  UpdateAddressUseCase,
} from "../use-cases/address";

export type ICreateAddressRepositoryDataIn = Omit<
  IAddressEntity,
  "created_at" | "updated_at"
>;

export type IUpdateAddressRepositoryDataIn = Partial<
  Omit<ICreateAddressRepositoryDataIn, "id">
>;

export interface ICreateAddressUseCaseDataIn
  extends Omit<ICreateAddressRepositoryDataIn, "id"> {}

export interface IUpdateAddressUseCaseDataIn
  extends Partial<IUpdateAddressRepositoryDataIn> {
  id: string;
}

export interface IAddressEstablishment extends IAddressEntity {
  establishment: IEstablishmentEntity | null;
}

export interface IAddressUseCases {
  createAddress: CreateAddressUseCase;
  getAllAddresses: GetAllAddressesUseCase;
  updateAddress: UpdateAddressUseCase;
  deleteAddress: DeleteAddressUseCase;
  getAddressById: GetAddressByIdUseCase;
}
