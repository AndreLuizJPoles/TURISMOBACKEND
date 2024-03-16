import { IEstablishmentWorkingTimeEntity } from "../../entities";
import {
  ICreateEstablishmentWorkingTimeRepositoryDataIn,
  IUpdateEstablishmentWorkingTimeRepositoryDataIn,
} from "../../types";
import { IDefaultRepositoryPort } from "./defaultRepository.port";

export interface IEstablishmentWorkingTimeRepositoryPort
  extends IDefaultRepositoryPort<
    IEstablishmentWorkingTimeEntity,
    ICreateEstablishmentWorkingTimeRepositoryDataIn,
    IUpdateEstablishmentWorkingTimeRepositoryDataIn
  > {
  getById: (id: string) => Promise<IEstablishmentWorkingTimeEntity | null>;
}
