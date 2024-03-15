import { IEstablishmentEntity } from "../entities";
import { ICreateAddressUseCaseDataIn, IUpdateAddressUseCaseDataIn } from "./address.types";
import { ICreateEstablishmentWorkingTimeUseCaseDataIn, IUpdateEstablishmentWorkingTimeUseCaseDataIn } from "./establishmentWorkingTime.types";

export type ICreateEstablishmentRepositoryDataIn = Omit<
  IEstablishmentEntity,
  "created_at" | "updated_at"
>;

export type IUpdateEstablishmentRepositoryDataIn = Partial<
  Omit<ICreateEstablishmentRepositoryDataIn, "id">
>;

export interface ICreateEstablishmentUseCaseDataIn
  extends Omit<ICreateEstablishmentRepositoryDataIn, "id"> {
  address: Omit<ICreateAddressUseCaseDataIn, "establishment_id" | "user_id">;
  workingTime: Omit<
    ICreateEstablishmentWorkingTimeUseCaseDataIn,
    "establishment_id"
  >;
}

export interface IUpdateEstablishmentUseCaseDataIn
  extends IUpdateEstablishmentRepositoryDataIn {
  address?: Omit<IUpdateAddressUseCaseDataIn, "establishment_id" | "user_id">;
  workingTime?: Omit<
    IUpdateEstablishmentWorkingTimeUseCaseDataIn,
    "establishment_id"
  >;
  id: string
}