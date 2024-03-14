import { IJwtTokenGeneratorPort } from "../../core/ports";
import jwt, { SignOptions } from "jsonwebtoken";
import {
  IDecodeTokenDataReturn,
  IGenerateTokenDataType,
} from "../../core/types";

export class JwtTokenGeneratorAdapter implements IJwtTokenGeneratorPort {
  private secret: string = String(process.env.JWT_SECRET_TOKEN);

  generateToken(data: IGenerateTokenDataType): string {
    const token = jwt.sign(data, this.secret, {
      expiresIn: "24h",
    });

    return token;
  }

  decodeToken(token: string): IDecodeTokenDataReturn {
    const decodeToken = jwt.verify(
      token,
      this.secret
    ) as IDecodeTokenDataReturn;

    return decodeToken;
  }
}
