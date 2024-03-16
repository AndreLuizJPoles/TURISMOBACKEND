import { IAddressEntity } from "../../entities";
import {
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
  getById: (id: string) => Promise<IAddressEntity | null>;
}
