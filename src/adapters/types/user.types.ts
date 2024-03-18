import { IUserEntity } from "../../core/entities";
import { UserController } from "../api/express/controllers";
import { UserRepositoryAdapter } from "../database/prisma";
import {
  PasswordHashAdapter,
} from "../utils";
import { IRole } from "../../core/types/role.types";

export interface IUserAssembler {
  userController: UserController;
  userRepository: UserRepositoryAdapter;
}

export interface IUserExpressRequest {
  user: IUserEntity;
  role: IRole;
}
