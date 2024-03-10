import { IUserEntity } from "../../entities";
import { ICreateUserRepositoryDataIn } from "../../types";
import { IDefaultRepositoryPort } from "./default.repository";

export interface IUserRepositoryPort
  extends IDefaultRepositoryPort<IUserEntity, ICreateUserRepositoryDataIn> {
  getByEmail: (email: string) => Promise<IUserEntity>;
  getById: (id: string) => Promise<IUserEntity>;
}
