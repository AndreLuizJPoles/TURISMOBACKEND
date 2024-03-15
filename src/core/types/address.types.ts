import { IAddressEntity } from "../entities";

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
