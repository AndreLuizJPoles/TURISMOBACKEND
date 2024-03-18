import { IPasswordHashAssembler } from "../types";
import { PasswordHashAdapter } from "../utils";

export const passwordHashAssembler = (): IPasswordHashAssembler => {
  return {
    passwordHash: new PasswordHashAdapter(),
  };
};
