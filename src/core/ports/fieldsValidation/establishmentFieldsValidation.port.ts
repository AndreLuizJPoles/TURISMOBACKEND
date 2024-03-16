import {
  ICreateEstablishmentUseCaseDataIn,
  ILoginUseCaseDataIn,
  IUpdateEstablishmentUseCaseDataIn,
} from "../../types";
import { IDefaultFieldsValidationPort } from "./defaulFieldsValidation.port";

export interface IEstablishmentFieldsValidationPort
  extends IDefaultFieldsValidationPort<
    ICreateEstablishmentUseCaseDataIn,
    IUpdateEstablishmentUseCaseDataIn
  > {
    login: (data: ILoginUseCaseDataIn) => void | Error
  }
