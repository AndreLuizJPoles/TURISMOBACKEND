import { IEstablishmentContactFieldsValidationPort } from "../../../core/ports";
import { IUpdateEstablishmentContactUseCaseDataIn } from "../../../core/types";
import zod from "zod";

export class EstablishmentContactAPIFieldsValidationAdapter
  implements IEstablishmentContactFieldsValidationPort
{
  update(
    data: IUpdateEstablishmentContactUseCaseDataIn
  ): IUpdateEstablishmentContactUseCaseDataIn {
    const establishmentContactSchema = zod.strictObject(
      {
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
      },
    );

    const parsedEstablishmentContactSchema =
      establishmentContactSchema.parse(data);

    return parsedEstablishmentContactSchema;
  }

  getById(id: string): string {
    const establishmentSchema = zod
      .string({
        required_error: "Informe estabelecimento a ser buscado.",
      })
      .uuid("O ID informado não é válido.");

    const parsedEstablishmentSchema = establishmentSchema.parse(id);

    return parsedEstablishmentSchema;
  }

  delete(id: string): string {
    const establishmentSchema = zod
      .string({
        required_error: "Informe estabelecimento a ser deletado.",
      })
      .uuid("O ID informado não é válido.");

    const parsedEstablishmentSchema = establishmentSchema.parse(id);

    return parsedEstablishmentSchema;
  }
}
