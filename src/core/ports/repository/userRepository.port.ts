import { IUserEntity } from "../../entities";
import { ICreateUserRepositoryDataIn, IUpdateUserRepositoryDataIn } from "../../types";
import { IDefaultRepositoryPort } from "./defaultRepository.port";

export interface IUserRepositoryPort
  extends IDefaultRepositoryPort<IUserEntity, ICreateUserRepositoryDataIn, IUpdateUserRepositoryDataIn> {
  getByEmail: (email: string) => Promise<IUserEntity | null>;
  getById: (id: string) => Promise<IUserEntity | null>;
}
