import { IEstablishmentContactFieldsValidationPort } from "../../../core/ports/fieldsValidation/establishmentContactFieldsValidation.port";
import { IUpdateEstablishmentContactUseCaseDataIn } from "../../../core/types";
import zod from "zod";

export class EstablishmentContactAPIFieldsValidationAdapter
  implements IEstablishmentContactFieldsValidationPort
{
  validateById(id: string): string {
    const establishmentContactSchema = zod
      .string({
        required_error: "Informe um endereços.",
      })
      .uuid("O ID informado não é válido.");

    const parsedEstablishmentContactSchema =
      establishmentContactSchema.parse(id);

    return parsedEstablishmentContactSchema;
  }

  update(
    data: IUpdateEstablishmentContactUseCaseDataIn
  ): IUpdateEstablishmentContactUseCaseDataIn {
    const establishmentContactSchema = zod.strictObject({
      id: zod.string().uuid({
        message: "O estabelecimento informado não é valido.",
      }),
      phone_number: zod
        .string()
        .min(1, {
          message: "Informe um número de telefone válido.",
        })
        .optional(),
      email: zod
        .string()
        .email({
          message: "Informe um email válido.",
        })
        .optional(),
    });

    const parsedEstablishmentContactSchema =
      establishmentContactSchema.parse(data);

    return parsedEstablishmentContactSchema;
  }
}
