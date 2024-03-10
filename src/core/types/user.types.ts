import { IUserEntity } from "../entities";

export type ICreateUserRepositoryDataIn = Omit<
  IUserEntity,
  "created_at" | "updated_at"
>;

export type IUpdateUserRepositoryDataIn = Omit<
  ICreateUserRepositoryDataIn,
  "id"
>;

export interface ICreateUserServiceDataIn
  extends Omit<ICreateUserRepositoryDataIn, "id"> {}

export interface IUpdateUserServiceDataIn
  extends Partial<Omit<ICreateUserServiceDataIn, "email" | "picture_url">> {
  id: string;
}
