import { IUserEntity } from "../../core/entities";
import { UserController } from "../api/express/controllers";
import { UserRepositoryAdapter } from "../database/prisma";
import { UserAPIFieldsValidationAdapter } from "../utils/apiFieldsValidation/userFieldsValidation.adapter";
import { JwtTokenGeneratorAdapter } from "../utils/jwtTokenGenerator.adapter";
import { PasswordHashAdapter } from "../utils/passwordHash.adapter";
import { IRole } from "../../core/types/role.types";

export interface IUserAssembler {
  userController: UserController;
  passwordHash: PasswordHashAdapter;
  userFieldsValidator: UserAPIFieldsValidationAdapter;
  jwtTokenGenerator: JwtTokenGeneratorAdapter;
  userRepository: UserRepositoryAdapter;
}

export interface IUserExpressRequest {
  user: IUserEntity;
  role: IRole;
}
