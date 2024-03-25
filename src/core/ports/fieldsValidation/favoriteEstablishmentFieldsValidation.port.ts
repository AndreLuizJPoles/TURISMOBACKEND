import { IDefaultFieldsValidationPort } from "./defaulFieldsValidation.port";

export interface IFavoriteEstablishmentFieldsValidationPort
  extends Pick<IDefaultFieldsValidationPort<any, any>, "validateById"> {}
