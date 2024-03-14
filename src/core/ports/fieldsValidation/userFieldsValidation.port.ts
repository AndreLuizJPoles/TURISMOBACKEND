import { IDefaultFieldsValidationPort } from "./defaulFieldsValidation.port";

export interface IUserFieldsValidationPort
  extends IDefaultFieldsValidationPort {
  login: <PayloadDataType>(data: PayloadDataType) => void | Error;
  getByEmail: (email: string) => void | Error;
}
