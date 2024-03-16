import {
  ICreateEstablishmentUseCaseDataIn,
  IUpdateEstablishmentUseCaseDataIn,
} from "../../types";
import { IDefaultFieldsValidationPort } from "./defaulFieldsValidation.port";

export interface IEstablishmentFieldsValidationPort
  extends IDefaultFieldsValidationPort<
    ICreateEstablishmentUseCaseDataIn,
    IUpdateEstablishmentUseCaseDataIn
  > {
  getByUserId: (user_id: string) => void | Error;
}
