import { IEstablishmentFieldsValidationPort } from "../../../core/ports";
import {
  ICreateEstablishmentUseCaseDataIn,
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
      name: zod
        .string({
          required_error: "Informe um nome.",
        })
        .min(1, {
          message: "Informe um nome válido.",
        }),
      cnpj: zod
        .string({
          required_error: "Informe um CNPJ.",
        })
        .length(14, {
          message: "O CNPJ informado deve conter 14 caracteres.",
        }),
      description: zod
        .string({
          required_error: "Informe uma descrição.",
        })
        .min(1, {
          message: "Informe um descrição válida.",
        }),
      picture_url: zod.string(),
      background_picture_url: zod.string().optional(),
      category_id: zod
        .string({
          required_error: "Informe uma categoria.",
        })
        .uuid({
          message: "A categoria informada não é valida.",
        }),
      address: zod.strictObject(
        {
          city: zod
            .string({
              required_error: "Informe uma cidade.",
            })
            .min(1, {
              message: "Informe uma cidade válida.",
            }),
          street: zod
            .string({
              required_error: "Informe uma rua.",
            })
            .min(1, {
              message: "Informe uma rua válida.",
            }),
          number: zod
            .number({
              required_error: "Informe um número.",
            })
            .int({
              message: "O número do endereço deve ser inteiro.",
            }),
          neighborhood: zod
            .string({
              required_error: "Informe um bairro.",
            })
            .min(1, {
              message: "Informe um bairro válido.",
            }),
          complement: zod
            .string({
              required_error: "Informe um complemento.",
            })
            .min(1, {
              message: "Informe um complemento válido.",
            })
            .optional(),
          zip_code: zod
            .string({
              required_error: "Informe um CEP.",
            })
            .min(1, {
              message: "Informe um CEP válido.",
            }),
          state: zod
            .string({
              required_error: "Informe um estado.",
            })
            .min(1, {
              message: "Informe um estado válido.",
            }),
          country: zod
            .string({
              required_error: "Informe um país.",
            })
            .min(1, {
              message: "Informe um país válido.",
            }),
        },
        {
          required_error: "Os dados de endereço não foram informados.",
        }
      ),
      workingTime: zod.strictObject(
        {
          open_on_sunday: zod.boolean({
            required_error: "Informe se abrirá no Domingo.",
          }),
          open_on_monday: zod.boolean({
            required_error: "Informe se abrirá na Segunda-feira.",
          }),
          open_on_tuesday: zod.boolean({
            required_error: "Informe se abrirá na Terça-feira.",
          }),
          open_on_wednesday: zod.boolean({
            required_error: "Informe se abrirá na Quarta-feira.",
          }),
          open_on_thursday: zod.boolean({
            required_error: "Informe se abrirá na Quinta-feira.",
          }),
          open_on_friday: zod.boolean({
            required_error: "Informe se abrirá na Sexta-feira.",
          }),
          open_on_saturday: zod.boolean({
            required_error: "Informe se abrirá no Sábado.",
          }),
          opening_time: zod
            .string({
              required_error: "Informe um horário de abertura.",
            })
            .min(1, {
              message: "Informe um horário de abertura válido.",
            }),
          closing_time: zod
            .string({
              required_error: "Informe um horário de fechamento.",
            })
            .min(1, {
              message: "Informe um horário de fechamento válido.",
            }),
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
            city: zod
              .string({
                required_error: "Informe uma cidade.",
              })
              .min(1, {
                message: "Informe uma cidade válida.",
              })
              .optional(),
            street: zod
              .string({
                required_error: "Informe uma rua.",
              })
              .min(1, {
                message: "Informe uma rua válida.",
              })
              .optional(),
            number: zod
              .number({
                required_error: "Informe um número.",
              })
              .int({
                message: "O número do endereço deve ser inteiro.",
              })
              .optional(),
            neighborhood: zod
              .string({
                required_error: "Informe um bairro.",
              })
              .min(1, {
                message: "Informe um bairro válido.",
              })
              .optional(),
            complement: zod
              .string({
                required_error: "Informe um complemento.",
              })
              .min(1, {
                message: "Informe um complemento válido.",
              })
              .optional(),
            zip_code: zod
              .string({
                required_error: "Informe um CEP.",
              })
              .min(1, {
                message: "Informe um CEP válido.",
              })
              .optional(),
            state: zod
              .string({
                required_error: "Informe um estado.",
              })
              .min(1, {
                message: "Informe um estado válido.",
              })
              .optional(),
            country: zod
              .string({
                required_error: "Informe um país.",
              })
              .min(1, {
                message: "Informe um país válido.",
              })
              .optional(),
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

  validateById(id: string): string {
    const establishmentSchema = zod
      .string({
        required_error: "Informe um estabelecimento."
      })
      .uuid("O ID informado não é válido.");

    const parsedEstablishmentSchema = establishmentSchema.parse(id);

    return parsedEstablishmentSchema;
  }
}
