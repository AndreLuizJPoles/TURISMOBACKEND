import { IUserFieldsValidationPort } from "../../../core/ports/fieldsValidation";
import zod from "zod";
import {
  ICreateUserUseCaseDataIn,
  ILoginUseCaseDataIn,
  IUpdateUserUseCaseDataIn,
} from "../../../core/types";

export class UserAPIFieldsValidationAdapter
  implements IUserFieldsValidationPort
{
  delete(id: string): string {
    const userSchema = zod.string().uuid("O ID informado não é válido.");

    const parsedUserSchema = userSchema.parse(id);

    return parsedUserSchema;
  }

  getByEmail(email: string): string {
    const userSchema = zod.string().email("O email digitado não é válido.");

    const parsedUserSchema = userSchema.parse(email);

    return parsedUserSchema;
  }

  getById(id: string): string {
    const userSchema = zod.string().uuid("O ID informado não é válido.");

    const parsedUserSchema = userSchema.parse(id);

    return parsedUserSchema;
  }

  login(data: ILoginUseCaseDataIn): ILoginUseCaseDataIn {
    const userSchema = zod.object({
      email: zod.string().email({
        message: "O email digitado não é válido.",
      }),
    });

    const parsedUserSchema = userSchema.parse(data);

    return { ...parsedUserSchema, password: data.password };
  }

  create(data: ICreateUserUseCaseDataIn): ICreateUserUseCaseDataIn {
    const birthdate = new Date(data.birthdate);

    const userData: ICreateUserUseCaseDataIn = {
      ...data,
      birthdate,
    };

    const userSchema = zod.strictObject({
      name: zod.string(),
      email: zod.string().email(),
      password: zod.string().min(8, {
        message: "Sua senha deve ter pelo menos 8 caracteres.",
      }),
      picture_url: zod.string(),
      birthdate: zod.date({
        description: "Informe uma data de nascimento válida",
      }),
    });

    const parsedUserSchema = userSchema.parse(userData);

    return parsedUserSchema;
  }
  update(data: IUpdateUserUseCaseDataIn): IUpdateUserUseCaseDataIn {
    const userData = data;

    if (data.birthdate) {
      userData.birthdate = new Date(data.birthdate);
    }

    const userSchema = zod.strictObject({
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
      birthdate: zod
        .date({
          description: "Informe uma data de nascimento válida",
        })
        .optional(),
    });

    const parsedUserSchema = userSchema.parse(userData);

    return parsedUserSchema;
  }
}
