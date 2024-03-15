import { ICreateUserUseCaseDataIn, IUpdateUserUseCaseDataIn } from "../../types";
import { IDefaultFieldsValidationPort } from "./defaulFieldsValidation.port";

export interface IUserFieldsValidationPort
  extends IDefaultFieldsValidationPort<ICreateUserUseCaseDataIn, IUpdateUserUseCaseDataIn> {
  login: <PayloadDataType>(data: PayloadDataType) => void | Error;
  getByEmail: (email: string) => void | Error;
}
