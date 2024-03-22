import { IAddressEntity, IEstablishmentEntity } from "../../entities";
import {
  IAddressEstablishment,
  ICreateAddressRepositoryDataIn,
  IUpdateAddressRepositoryDataIn,
} from "../../types";
import { IDefaultRepositoryPort } from "./defaultRepository.port";

export interface IAddressRepositoryPort
  extends IDefaultRepositoryPort<
    IAddressEntity,
    ICreateAddressRepositoryDataIn,
    IUpdateAddressRepositoryDataIn
  > {
  getByCEP: (cep: string) => Promise<IAddressEntity | null>;
  getByEstablishmentId: (
    establishment_id: string
  ) => Promise<IAddressEstablishment | null>;
  getByUserId: (user_id: string) => Promise<IAddressEntity | null>;
}
