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
  getByCNPJ: (cnpj: string) => Promise<IEstablishmentEntity | null>;
}
