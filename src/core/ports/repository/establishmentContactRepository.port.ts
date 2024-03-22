import { IEstablishmentContactEntity } from "../../entities";
import {
  ICreateEstablishmentContactRepositoryDataIn,
  IUpdateEstablishmentContactRepositoryDataIn,
} from "../../types/establishmentContact.types";
import { IDefaultRepositoryPort } from "./defaultRepository.port";

export interface IEstablishmentContactRepositoryPort
  extends IDefaultRepositoryPort<
    IEstablishmentContactEntity,
    ICreateEstablishmentContactRepositoryDataIn,
    IUpdateEstablishmentContactRepositoryDataIn
  > {
  createMany: (
    data: ICreateEstablishmentContactRepositoryDataIn[]
  ) => Promise<void>;
  getByEstablishmentId: (
    establishment_id: string
  ) => Promise<IEstablishmentContactEntity[]>;
}
