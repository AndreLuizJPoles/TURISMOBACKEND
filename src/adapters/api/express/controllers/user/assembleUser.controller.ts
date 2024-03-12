import { IUserUseCases } from "../../../../../core/types";
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetAllUsersUseCase,
  GetUserByEmailUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
} from "../../../../../core/use-cases";
import { UserRepository } from "../../../../database/prisma";
import { UserController } from "./user.controller";

export const assembleUserController = (): UserController => {
  const userRepository = new UserRepository();

  const userUseCases: IUserUseCases = {
    createUser: new CreateUserUseCase(userRepository),
    deleteUser: new DeleteUserUseCase(userRepository),
    getAllUsers: new GetAllUsersUseCase(userRepository),
    getUserByEmail: new GetUserByEmailUseCase(userRepository),
    getUserById: new GetUserByIdUseCase(userRepository),
    updateUser: new UpdateUserUseCase(userRepository),
  };

  const userController = new UserController(userUseCases);

  return userController;
};
