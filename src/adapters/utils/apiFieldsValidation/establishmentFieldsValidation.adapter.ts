import { IEstablishmentFieldsValidationPort } from "../../../core/ports";
import {
  ICreateEstablishmentUseCaseDataIn,
  IUpdateEstablishmentUseCaseDataIn,
} from "../../../core/types";
import zod from "zod";

export class EstablishmentAPIFieldsValidationAdapter
  implements IEstablishmentFieldsValidationPort
{
  create(data: ICreateEstablishmentUseCaseDataIn): void | Error {
    const { address, workingTime, ...establishment } = data;

    const establishmentSchema = zod.object({
      name: zod.string(),
      email: zod.string().email({
        message: "Informe um email válido",
      }),
      password: zod.string().min(8, {
        message: "Sua senha deve ter pelo menos 8 caracteres.",
      }),
      cnpj: zod.string().length(14, {
        message: "O CNPJ informado deve conter 14 caracteres.",
      }),
      description: zod.string(),
      picture_url: zod.string(),
      background_picture_url: zod.string().optional(),
      category_id: zod.string().uuid({
        message: "A categoria informada não é valida.",
      }),
    });

    establishmentSchema.parse(establishment);

    const addressSchema = zod.object({
      city: zod.string(),
      street: zod.string(),
      number: zod.number().int({
        message: "O número do endereço deve ser inteiro.",
      }),
      neighborhood: zod.string(),
      complement: zod.string().optional(),
      zip_code: zod.string(),
    });

    addressSchema.parse(address);

    const workingTimeSchema = zod.object({
      open_on_sunday: zod.boolean(),
      open_on_monday: zod.boolean(),
      open_on_tuesday: zod.boolean(),
      open_on_wednesday: zod.boolean(),
      open_on_thursday: zod.boolean(),
      open_on_friday: zod.boolean(),
    });

    workingTimeSchema.parse(workingTime);
  }

  update(data: IUpdateEstablishmentUseCaseDataIn): void | Error {
    const { address, workingTime, ...establishment } = data;

    const establishmentSchema = zod.object({
      name: zod.string(),
      email: zod.string().email({
        message: "Informe um email válido",
      }),
      password: zod.string().min(8, {
        message: "Sua senha deve ter pelo menos 8 caracteres.",
      }),
      cnpj: zod.string().length(14, {
        message: "O CNPJ informado deve conter 14 caracteres.",
      }),
      description: zod.string(),
      picture_url: zod.string(),
      background_picture_url: zod.string().optional(),
      category_id: zod.string().uuid({
        message: "A categoria informada não é valida.",
      }),
    });

    establishmentSchema.parse(establishment);

    if (address) {
      const addressSchema = zod.object({
        city: zod.string().optional(),
        street: zod.string().optional(),
        number: zod
          .number()
          .int({
            message: "O número do endereço deve ser inteiro.",
          })
          .optional(),
        neighborhood: zod.string().optional(),
        complement: zod.string().optional(),
        zip_code: zod.string().optional(),
      });

      addressSchema.parse(address);
    }

    if (workingTime) {
      const workingTimeSchema = zod.object({
        open_on_sunday: zod.boolean().optional(),
        open_on_monday: zod.boolean().optional(),
        open_on_tuesday: zod.boolean().optional(),
        open_on_wednesday: zod.boolean().optional(),
        open_on_thursday: zod.boolean().optional(),
        open_on_friday: zod.boolean().optional(),
      });

      workingTimeSchema.parse(workingTime);
    }
  }

  getById(id: string): void | Error {
    const establishmentSchema = zod
      .string()
      .uuid("O ID informado não é válido.");

    establishmentSchema.parse(id);
  }

  delete(id: string): void | Error {
    const establishmentSchema = zod
      .string()
      .uuid("O ID informado não é válido.");

    establishmentSchema.parse(id);
  }
}
