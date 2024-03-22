import { IAddressFieldsValidationPort } from "../../../core/ports";
import {
  ICreateAddressUseCaseDataIn,
  IUpdateAddressUseCaseDataIn,
} from "../../../core/types";
import zod from "zod";

export class AddressAPIFieldsValidationAdapter
  implements IAddressFieldsValidationPort
{
  getByCEP(cep: string): string {
    const addressSchema = zod.string().min(1, {
      message: "Informe um CEP válido.",
    });

    const parsedAddressSchema = addressSchema.parse(cep);

    return parsedAddressSchema;
  }

  create(data: ICreateAddressUseCaseDataIn): ICreateAddressUseCaseDataIn {
    const addressSchema = zod.strictObject({
      city: zod.string({
        required_error: "Informe a cidade.",
      }),
      street: zod.string({
        required_error: "Informe a rua.",
      }),
      number: zod
        .number({
          required_error: "Informe o número.",
        })
        .int("Informe um número válido."),
      neighborhood: zod.string({
        required_error: "Informe o bairro.",
      }),
      complement: zod
        .string()
        .min(1, {
          message: "Informe um valor válido para o complemento.",
        })
        .optional(),
      zip_code: zod
        .string({
          required_error: "Informe o CEP.",
        })
        .min(1, {
          message: "Informe um valor válido para o CEP.",
        }),
      state: zod
        .string({
          required_error: "Informe o estado.",
        })
        .min(1, {
          message: "Informe um valor válido para o estado.",
        }),
      country: zod
        .string({
          required_error: "Informe o país.",
        })
        .min(1, {
          message: "Informe um valor válido para o país.",
        }),
      user_id: zod
        .string()
        .uuid({
          message: "Informe um usuário válido.",
        })
        .optional(),
      establishment_id: zod
        .string()
        .uuid({
          message: "Informe um estabelecimento válido.",
        })
        .optional(),
    });

    const parsedAddressSchema = addressSchema.parse(data);

    return parsedAddressSchema;
  }

  update(data: IUpdateAddressUseCaseDataIn): IUpdateAddressUseCaseDataIn {
    const addressSchema = zod.strictObject({
      id: zod
        .string({
          required_error: "Informe o endereço a ser atualizado.",
        })
        .uuid(),
      city: zod.string().optional(),
      street: zod.string().optional(),
      number: zod.number().int("Informe um número válido.").optional(),
      neighborhood: zod.string().optional(),
      complement: zod
        .string()
        .min(1, {
          message: "Informe um valor válido para o complemento.",
        })
        .optional(),
      zip_code: zod
        .string()
        .min(1, {
          message: "Informe um valor válido para o CEP.",
        })
        .optional(),
      state: zod
        .string()
        .min(1, {
          message: "Informe um valor válido para o estado.",
        })
        .optional(),
      country: zod
        .string()
        .min(1, {
          message: "Informe um valor válido para o país.",
        })
        .optional(),
      user_id: zod
        .string()
        .uuid({
          message: "Informe um usuário válido.",
        })
        .optional(),
      establishment_id: zod
        .string()
        .uuid({
          message: "Informe um estabelecimento válido.",
        })
        .optional(),
    });

    const parsedAddressSchema = addressSchema.parse(data);

    return parsedAddressSchema;
  }

  validateById(id: string): string {
    const addressSchema = zod
      .string({
        required_error: "Informe um endereço.",
      })
      .uuid("O ID informado não é válido.");

    const parsedAddressSchema = addressSchema.parse(id);

    return parsedAddressSchema;
  }
}
