import { IUserEntity } from "../../entities";
import { ICreateUserRepositoryDataIn } from "../../types";
import { IDefaultRepositoryPort } from "./defaultRepository.port";

export interface IUserRepositoryPort
  extends IDefaultRepositoryPort<IUserEntity, ICreateUserRepositoryDataIn> {
  getByEmail: (email: string) => Promise<IUserEntity | null>;
  getById: (id: string) => Promise<IUserEntity | null>;
}
