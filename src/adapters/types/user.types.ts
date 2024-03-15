import { UserController } from "../api/express/controllers";
import { UserRepositoryAdapter } from "../database/prisma";
import { UserAPIFieldsValidationAdapter } from "../utils/apiFieldsValidation/userFieldsValidation.adapter";
import { JwtTokenGeneratorAdapter } from "../utils/jwtTokenGenerator.adapter";
import { PasswordHashAdapter } from "../utils/passwordHash.adapter";

export interface IUserAssembler {
    userController: UserController;
    passwordHash: PasswordHashAdapter;
    userFieldsValidator: UserAPIFieldsValidationAdapter;
    jwtTokenGenerator: JwtTokenGeneratorAdapter;
    userRepository: UserRepositoryAdapter;
}
