import { IUserFieldsValidationPort } from "../../../core/ports/fieldsValidation";
import zod from "zod";

export class UserAPIFieldsValidationAdapter
  implements IUserFieldsValidationPort
{
  delete(id: string): void | Error {
    const userSchema = zod.string().uuid("O ID informado não é válido.");

    userSchema.parse(id);
  }

  getByEmail(email: string): void | Error {
    const userSchema = zod.string().email("O email digitado não é válido.");

    userSchema.parse(email);
  }

  getById(id: string): void | Error {
    const userSchema = zod.string().uuid("O ID informado não é válido.");

    userSchema.parse(id);
  }

  login<PayloadDataType>(data: PayloadDataType): void | Error {
    const userSchema = zod.object({
      email: zod.string().email(),
      password: zod.string().min(8, {
        message: "Sua senha deve ter pelo menos 8 caracteres.",
      }),
    });

    userSchema.parse(data);
  }

  create<PayloadDataType>(data: PayloadDataType): void | Error {
    const userSchema = zod.object({
      name: zod.string(),
      email: zod.string().email(),
      gender: zod.enum(["male", "female"], {
        description: "Escolha masculino ou feminino.",
      }),
      cpf: zod.string().length(11, "O CPF digitado não possui 11 caracteres."),
      password: zod.string().min(8, {
        message: "Sua senha deve ter pelo menos 8 caracteres.",
      }),
      picture_url: zod.string(),
      phone_number: zod.string(),
    });

    userSchema.parse(data);
  }
  update<PayloadDataIn>(data: PayloadDataIn): void | Error {
    const userSchema = zod.object({
      id: zod.string().uuid("O ID informado não é válido."),
      name: zod.string().optional(),
      gender: zod
        .enum(["male", "female"], {
          description: "Escolha masculino ou feminino.",
        })
        .optional(),
      cpf: zod
        .string()
        .length(11, "O CPF digitado não possui 11 caracteres.")
        .optional(),
      picture_url: zod.string().optional(),
      phone_number: zod.string().optional(),
    });

    userSchema.parse(data);
  }
}
