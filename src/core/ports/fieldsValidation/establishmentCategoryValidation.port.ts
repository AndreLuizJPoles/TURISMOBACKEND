import {
  ICreateEstablishmentCategoryUseCaseDataIn,
  IUpdateEstablishmentCategoryUseCaseDataIn,
} from "../../types";
import { IDefaultFieldsValidationPort } from "./defaulFieldsValidation.port";

export interface IEstablishmentCategoryFieldsValidationPort
  extends IDefaultFieldsValidationPort<
    ICreateEstablishmentCategoryUseCaseDataIn,
    IUpdateEstablishmentCategoryUseCaseDataIn
  > {}
