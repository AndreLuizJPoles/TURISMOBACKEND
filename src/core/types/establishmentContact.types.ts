import { IEstablishmentContactEntity } from "../entities";
import {
  DeleteEstablishmentContactUseCase,
  GetEstablishmentContactByEstablishmentIdUseCase,
  GetEstablishmentContactByIdUseCase,
  UpdateEstablishmentContactUseCase,
} from "../use-cases/establishmentContact";

export type ICreateEstablishmentContactRepositoryDataIn = Omit<
  IEstablishmentContactEntity,
  "created_at" | "updated_at"
>;

export type IUpdateEstablishmentContactRepositoryDataIn = Partial<
  Omit<ICreateEstablishmentContactRepositoryDataIn, "id" | "establishment_id">
>;

export interface ICreateEstablishmentContactUseCaseDataIn
  extends Omit<
    ICreateEstablishmentContactRepositoryDataIn,
    "id" | "establishment_id"
  > {}

export interface IUpdateEstablishmentContactUseCaseDataIn
  extends IUpdateEstablishmentContactRepositoryDataIn {
  id: string;
}

export interface IEstablishmentContactUseCases {
  getEstablishmentContactByEstablishmentId: GetEstablishmentContactByEstablishmentIdUseCase;
  getEstablishmentContactById: GetEstablishmentContactByIdUseCase;
  updateEstablishmentContact: UpdateEstablishmentContactUseCase;
  deleteEstablishmentContact: DeleteEstablishmentContactUseCase;
}
