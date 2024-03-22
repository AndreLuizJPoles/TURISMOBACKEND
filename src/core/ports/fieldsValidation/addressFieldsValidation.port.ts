import {
  ICreateAddressUseCaseDataIn,
  IUpdateAddressUseCaseDataIn,
} from "../../types";
import { IDefaultFieldsValidationPort } from "./defaulFieldsValidation.port";

export interface IAddressFieldsValidationPort
  extends IDefaultFieldsValidationPort<
    ICreateAddressUseCaseDataIn,
    IUpdateAddressUseCaseDataIn
  > {
  getByCEP: (cep: string) => string;
}
