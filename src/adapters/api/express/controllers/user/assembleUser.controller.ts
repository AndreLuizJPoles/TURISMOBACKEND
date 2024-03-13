import { IUserUseCases } from "../../../../../core/types";
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetAllUsersUseCase,
  GetUserByEmailUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
} from "../../../../../core/use-cases";
import { UserRepositoryAdapter } from "../../../../database/prisma";
import { PasswordHashAdapter } from "../../../../utils/passwordHash.adapter";
import { UserController } from "./user.controller";

export const assembleUserController = (): UserController => {
  const userRepository = new UserRepositoryAdapter();

  const passwordSalt = String(process.env.PASSWORD_HASH_SALT)
  const passwordSecret = String(process.env.PASSWORD_HASH_SECRET)
  const passwordHash = new PasswordHashAdapter(passwordSalt, passwordSecret);

  const userUseCases: IUserUseCases = {
    createUser: new CreateUserUseCase(userRepository, passwordHash),
    deleteUser: new DeleteUserUseCase(userRepository),
    getAllUsers: new GetAllUsersUseCase(userRepository),
    getUserByEmail: new GetUserByEmailUseCase(userRepository),
    getUserById: new GetUserByIdUseCase(userRepository),
    updateUser: new UpdateUserUseCase(userRepository),
  };

  const userController = new UserController(userUseCases);

  return userController;
};
