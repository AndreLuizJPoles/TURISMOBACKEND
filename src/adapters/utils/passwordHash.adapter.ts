import { IPasswordHashPort } from "../../core/ports";
import argon from "argon2";

export class PasswordHashAdapter implements IPasswordHashPort {
  constructor(private salt: string, private secret: string) {}

  async hash(password: string): Promise<string> {
    try {
      const hashed_password = await argon.hash(password, {
        type: argon.argon2id,
        secret: this.secret,
        salt: this.salt,
      });

      return hashed_password;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async verify(
    plaintext_password: string,
    hashed_password: string
  ): Promise<boolean> {
    try {
      const isPasswordValid = await argon.verify(
        hashed_password,
        plaintext_password,
        {
          secret: this.secret,
        }
      );

      return isPasswordValid;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
