import { IPasswordHashPort } from "../../core/ports";
import argon from "argon2";

export class PasswordHashAdapter implements IPasswordHashPort {
  private salt: string = String(process.env.PASSWORD_HASH_SALT)
  private secret: string = String(process.env.PASSWORD_HASH_SECRET)

  async hash(password: string): Promise<string> {
    try {
      const hashed_password = await argon.hash(password, {
        type: argon.argon2id,
        salt: Buffer.from(this.salt),
        secret: Buffer.from(this.secret),
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
        plaintext_password
      );

      return isPasswordValid;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
