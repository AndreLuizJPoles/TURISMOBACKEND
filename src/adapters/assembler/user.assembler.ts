import { IUserUseCases } from "../../core/types";
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetAllUsersUseCase,
  GetUserByEmailUseCase,
  GetUserByIdUseCase,
  UpdateUserUseCase,
  LoginUserUseCase,
} from "../../core/use-cases";
import { UserController } from "../api/express/controllers";
import { UserRepositoryAdapter } from "../database/prisma";
import { IUserAssembler } from "../types";
import { UserAPIFieldsValidationAdapter } from "../utils";
import { jwtTokenGeneratorAssembler, passwordHashAssembler } from ".";

export const userAssembler = (): IUserAssembler => {
  const userRepository = new UserRepositoryAdapter();
  const { passwordHash } = passwordHashAssembler();
  const userFieldsValidator = new UserAPIFieldsValidationAdapter();
  const { jwtTokenGenerator } = jwtTokenGeneratorAssembler();

  const userUseCases: IUserUseCases = {
    createUser: new CreateUserUseCase(
      userRepository,
      passwordHash,
      userFieldsValidator
    ),
    deleteUser: new DeleteUserUseCase(userRepository, userFieldsValidator),
    getAllUsers: new GetAllUsersUseCase(userRepository),
    getUserByEmail: new GetUserByEmailUseCase(
      userRepository,
      userFieldsValidator
    ),
    getUserById: new GetUserByIdUseCase(userRepository, userFieldsValidator),
    updateUser: new UpdateUserUseCase(userRepository, userFieldsValidator),
    loginUser: new LoginUserUseCase(
      userRepository,
      userFieldsValidator,
      passwordHash,
      jwtTokenGenerator
    ),
  };

  const userController = new UserController(userUseCases);

  return {
    userController,
    userRepository,
  };
};
