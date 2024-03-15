import { IUserUseCases } from "../../../../../core/types";
import {
  CreateUserUseCase,
  DeleteUserUseCase,
  GetAllUsersUseCase,
  GetUserByEmailUseCase,
  GetUserByIdUseCase,
  LoginUserUseCase,
  UpdateUserUseCase,
} from "../../../../../core/use-cases";
import { UserRepositoryAdapter } from "../../../../database/prisma";
import { UserAPIFieldsValidationAdapter } from "../../../../utils/apiFieldsValidation/userFieldsValidation.adapter";
import { JwtTokenGeneratorAdapter } from "../../../../utils/jwtTokenGenerator.adapter";
import { PasswordHashAdapter } from "../../../../utils/passwordHash.adapter";
import { UserController } from "./user.controller";

export const assembleUserController = (): UserController => {
  const userRepository = new UserRepositoryAdapter();
  const passwordHash = new PasswordHashAdapter();
  const userFieldsValidator = new UserAPIFieldsValidationAdapter();
  const jwtTokenGenerator = new JwtTokenGeneratorAdapter();

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

  return userController;
};
