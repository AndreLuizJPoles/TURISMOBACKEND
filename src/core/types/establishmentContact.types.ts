import { IEstablishmentContactEntity, IEstablishmentEntity } from "../entities";
import {
  DeleteEstablishmentContactUseCase,
  GetEstablishmentContactsByEstablishmentIdUseCase,
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

export interface ICreateEstablishmentContactUseCaseDataIn {
  emails: string[];
  phone_numbers: string[];
}

export interface IUpdateEstablishmentContactUseCaseDataIn
  extends IUpdateEstablishmentContactRepositoryDataIn {
  id: string;
}

export interface IEstablishmentContactUseCases {
  getEstablishmentContactsByEstablishmentId: GetEstablishmentContactsByEstablishmentIdUseCase;
  getEstablishmentContactById: GetEstablishmentContactByIdUseCase;
  updateEstablishmentContact: UpdateEstablishmentContactUseCase;
  deleteEstablishmentContact: DeleteEstablishmentContactUseCase;
}

export interface IEstablishmentContactEstablishment
  extends IEstablishmentContactEntity {
  establishment: IEstablishmentEntity | null;
}
