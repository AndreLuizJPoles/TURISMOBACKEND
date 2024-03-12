import { IUserEntity } from "../entities";
import { CreateUserUseCase } from "../use-cases/user/createUser.usecase";
import { DeleteUserUseCase } from "../use-cases/user/deleteUser.usecase";
import { GetAllUsersUseCase } from "../use-cases/user/getAllUsers.usecase";
import { GetUserByEmailUseCase } from "../use-cases/user/getUserByEmail.usecase";
import { GetUserByIdUseCase } from "../use-cases/user/getUserById.usecase";
import { UpdateUserUseCase } from "../use-cases/user/updateUser.usecase";

export type ICreateUserRepositoryDataIn = Omit<
  IUserEntity,
  "created_at" | "updated_at"
>;

export type IUpdateUserRepositoryDataIn = Partial<
  Omit<ICreateUserRepositoryDataIn, "id">
>;

export interface ICreateUserServiceDataIn
  extends Omit<ICreateUserRepositoryDataIn, "id"> {}

export interface IUpdateUserServiceDataIn
  extends Partial<Omit<ICreateUserServiceDataIn, "email" | "picture_url">> {
  id: string;
}

export interface IUserUseCases {
  getAllUsers: GetAllUsersUseCase;
  getUserByEmail: GetUserByEmailUseCase;
  getUserById: GetUserByIdUseCase;
  createUser: CreateUserUseCase;
  updateUser: UpdateUserUseCase;
  deleteUser: DeleteUserUseCase;
}
