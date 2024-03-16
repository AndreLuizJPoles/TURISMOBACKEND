import { IEstablishmentEntity } from "../../entities";
import {
  ICreateEstablishmentRepositoryDataIn,
  IUpdateEstablishmentRepositoryDataIn,
} from "../../types";
import { IDefaultRepositoryPort } from "./defaultRepository.port";

export interface IEstablishmentRepositoryPort
  extends IDefaultRepositoryPort<
    IEstablishmentEntity,
    ICreateEstablishmentRepositoryDataIn,
    IUpdateEstablishmentRepositoryDataIn
  > {
  getById: (id: string) => Promise<IEstablishmentEntity | null>;
  getByEmail: (email: string) => Promise<IEstablishmentEntity | null>
}
