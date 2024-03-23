import {
  ICreateEstablishmentContactUseCaseDataIn,
  IUpdateEstablishmentContactUseCaseDataIn,
} from "../../types/establishmentContact.types";
import { IDefaultFieldsValidationPort } from "./defaulFieldsValidation.port";

export interface IEstablishmentContactFieldsValidationPort
  extends Omit<
    IDefaultFieldsValidationPort<
      ICreateEstablishmentContactUseCaseDataIn,
      IUpdateEstablishmentContactUseCaseDataIn
    >,
    "create"
  > {}
