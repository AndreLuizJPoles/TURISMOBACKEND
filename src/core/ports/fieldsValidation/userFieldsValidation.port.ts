import { ICreateUserUseCaseDataIn, ILoginUseCaseDataIn, IUpdateUserUseCaseDataIn } from "../../types";
import { IDefaultFieldsValidationPort } from "./defaulFieldsValidation.port";

export interface IUserFieldsValidationPort
  extends IDefaultFieldsValidationPort<ICreateUserUseCaseDataIn, IUpdateUserUseCaseDataIn> {
  login: (data: ILoginUseCaseDataIn) => ILoginUseCaseDataIn;
  getByEmail: (email: string) => string;
}
