import { IDecodeTokenDataReturn, IGenerateTokenDataType } from "../types";

export interface IJwtTokenGeneratorPort {
  generateToken: (data: IGenerateTokenDataType) => string;
  decodeToken: (token: string) => IDecodeTokenDataReturn;
}
