import { IRole } from "./role.types";

export interface IGenerateTokenDataType {
  id: string;
  role: IRole;
}

export interface IDecodeTokenDataReturn extends IGenerateTokenDataType {}
