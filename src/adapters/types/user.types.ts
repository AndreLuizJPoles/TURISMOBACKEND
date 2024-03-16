import { IEstablishmentEntity, IUserEntity } from "../../core/entities";
import { UserController } from "../api/express/controllers";
import { UserRepositoryAdapter } from "../database/prisma";
import {
  PasswordHashAdapter,
  UserAPIFieldsValidationAdapter,
  JwtTokenGeneratorAdapter,
} from "../utils";
import { IRole } from "../../core/types/role.types";

export interface IUserAssembler {
  userController: UserController;
  passwordHash: PasswordHashAdapter;
  userFieldsValidator: UserAPIFieldsValidationAdapter;
  jwtTokenGenerator: JwtTokenGeneratorAdapter;
  userRepository: UserRepositoryAdapter;
}

export interface IUserExpressRequest {
  user: IUserEntity | IEstablishmentEntity;
  role: IRole;
}
