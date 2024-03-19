import { IEstablishmentEntity } from "../entities";
import {
  CreateEstablishmentUseCase,
  DeleteEstablishmentUseCase,
  GetAllEstablishmentsUseCase,
  GetEstablishmentByIdUseCase,
  UpdateEstablishmentUseCase,
} from "../use-cases/establishment";
import {
  ICreateAddressUseCaseDataIn,
  IUpdateAddressUseCaseDataIn,
} from "./address.types";
import {
  ICreateEstablishmentWorkingTimeUseCaseDataIn,
  IUpdateEstablishmentWorkingTimeUseCaseDataIn,
} from "./establishmentWorkingTime.types";

export type ICreateEstablishmentRepositoryDataIn = Omit<
  IEstablishmentEntity,
  "created_at" | "updated_at" | "status"
>;

export type IUpdateEstablishmentRepositoryDataIn = Partial<
  Omit<ICreateEstablishmentRepositoryDataIn, "id">
>;

export interface ICreateEstablishmentUseCaseDataIn
  extends Omit<
    ICreateEstablishmentRepositoryDataIn,
    "id" | "status" | "user_id"
  > {
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
  id: string;
}

export interface IEstablishmentUseCases {
  getAllEstablishments: GetAllEstablishmentsUseCase;
  getEstablishmentById: GetEstablishmentByIdUseCase;
  createEstablishment: CreateEstablishmentUseCase;
  updateEstablishment: UpdateEstablishmentUseCase;
  deleteEstablishment: DeleteEstablishmentUseCase;
}
