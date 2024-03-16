import { IEstablishmentWorkingTimeEntity } from "../entities";

export type ICreateEstablishmentWorkingTimeRepositoryDataIn = Omit<
  IEstablishmentWorkingTimeEntity,
  "created_at" | "updated_at"
>;

export type IUpdateEstablishmentWorkingTimeRepositoryDataIn = Partial<
  Omit<
    ICreateEstablishmentWorkingTimeRepositoryDataIn,
    "id" | "establishment_id"
  >
>;

export interface ICreateEstablishmentWorkingTimeUseCaseDataIn
  extends Omit<
    ICreateEstablishmentWorkingTimeRepositoryDataIn,
    "id" | "establishment_id"
  > {}

export interface IUpdateEstablishmentWorkingTimeUseCaseDataIn
  extends Omit<
    IUpdateEstablishmentWorkingTimeRepositoryDataIn,
    "establishment_id"
  > {
  id: string;
}
