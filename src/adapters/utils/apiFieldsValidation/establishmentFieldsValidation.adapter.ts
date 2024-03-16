import { IEstablishmentFieldsValidationPort } from "../../../core/ports";
import {
  ICreateEstablishmentUseCaseDataIn,
  ILoginUseCaseDataIn,
  IUpdateEstablishmentUseCaseDataIn,
} from "../../../core/types";
import zod from "zod";

export class EstablishmentAPIFieldsValidationAdapter
  implements IEstablishmentFieldsValidationPort
{
  create(
    data: ICreateEstablishmentUseCaseDataIn
  ): ICreateEstablishmentUseCaseDataIn {
    const establishmentSchema = zod.strictObject({
      name: zod.string(),
      cnpj: zod.string().length(14, {
        message: "O CNPJ informado deve conter 14 caracteres.",
      }),
      description: zod.string(),
      picture_url: zod.string(),
      background_picture_url: zod.string().optional(),
      category_id: zod.string().uuid({
        message: "A categoria informada não é valida.",
      }),
      address: zod.strictObject(
        {
          city: zod.string(),
          street: zod.string(),
          number: zod.number().int({
            message: "O número do endereço deve ser inteiro.",
          }),
          neighborhood: zod.string(),
          complement: zod.string().optional(),
          zip_code: zod.string(),
        },
        {
          required_error: "Os dados de endereço não foram informados.",
        }
      ),
      workingTime: zod.strictObject(
        {
          open_on_sunday: zod.boolean(),
          open_on_monday: zod.boolean(),
          open_on_tuesday: zod.boolean(),
          open_on_wednesday: zod.boolean(),
          open_on_thursday: zod.boolean(),
          open_on_friday: zod.boolean(),
          opening_time: zod.string(),
          closing_time: zod.string(),
        },
        {
          required_error:
            "Os dados de horário de funcionamento não foram informados.",
        }
      ),
    });

    const parsedEstablishmentSchema = establishmentSchema.parse(data);

    return parsedEstablishmentSchema;
  }

  update(
    data: IUpdateEstablishmentUseCaseDataIn
  ): IUpdateEstablishmentUseCaseDataIn {
    const { address, workingTime, ...establishment } = data;

    const establishmentSchema = zod.strictObject(
      {
        id: zod.string().uuid({
          message: "O estabelecimento informado não é valido.",
        }),
        name: zod.string().optional(),
        cnpj: zod
          .string()
          .length(14, {
            message: "O CNPJ informado deve conter 14 caracteres.",
          })
          .optional(),
        description: zod.string().optional(),
        picture_url: zod.string().optional(),
        background_picture_url: zod.string().optional(),
        category_id: zod
          .string()
          .uuid({
            message: "A categoria informada não é valida.",
          })
          .optional(),
        address: zod
          .strictObject({
            id: zod.string().uuid({
              message: "O endereço é inválido.",
            }),
            city: zod.string().optional(),
            street: zod.string().optional(),
            number: zod
              .number()
              .int({
                message: "O número do endereço deve ser inteiro.",
              })
              .optional(),
            neighborhood: zod.string().optional(),
            complement: zod.string().optional().optional(),
            zip_code: zod.string().optional(),
          })
          .optional(),
        workingTime: zod
          .strictObject({
            id: zod.string().uuid({
              message: "O horário de funcionamento é inválido.",
            }),
            open_on_sunday: zod.boolean().optional(),
            open_on_monday: zod.boolean().optional(),
            open_on_tuesday: zod.boolean().optional(),
            open_on_wednesday: zod.boolean().optional(),
            open_on_thursday: zod.boolean().optional(),
            open_on_friday: zod.boolean().optional(),
            opening_time: zod.string().optional(),
            closing_time: zod.string().optional(),
          })
          .optional(),
      },
      {
        description: "Campos não permitidos foram informados",
      }
    );

    const parsedEstablishmentSchema = establishmentSchema.parse(establishment);

    return parsedEstablishmentSchema;
  }

  getById(id: string): string {
    const establishmentSchema = zod
      .string()
      .uuid("O ID informado não é válido.");

    const parsedEstablishmentSchema = establishmentSchema.parse(id);

    return parsedEstablishmentSchema;
  }

  delete(id: string): string {
    const establishmentSchema = zod
      .string()
      .uuid("O ID informado não é válido.");

    const parsedEstablishmentSchema = establishmentSchema.parse(id);

    return parsedEstablishmentSchema;
  }

  login(data: ILoginUseCaseDataIn) {
    const establishmentSchema = zod.strictObject({
      email: zod.string().email({
        message: "O email digitado não é válido.",
      }),
    });

    const parsedEstablishmentSchema = establishmentSchema.parse(data);

    return { parsedEstablishmentSchema, password: data.password };
  }
}
