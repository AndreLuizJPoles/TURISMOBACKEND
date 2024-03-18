import { IEstablishmentCategoryFieldsValidationPort } from "../../../core/ports";
import {
  ICreateEstablishmentCategoryUseCaseDataIn,
  IUpdateEstablishmentCategoryUseCaseDataIn,
} from "../../../core/types";
import zod from "zod";

export class EstablishmentCategoryAPIFieldsValidationAdapter
  implements IEstablishmentCategoryFieldsValidationPort
{
  create(
    data: ICreateEstablishmentCategoryUseCaseDataIn
  ): ICreateEstablishmentCategoryUseCaseDataIn {
    const establishmentCategorySchema = zod.strictObject({
      name: zod.string().min(1, {
        message: "Informe um nome válido.",
      }),
      description: zod.string().min(1, {
        message: "Informe uma descrição válida.",
      }),
    });

    const parsedEstablishmentCategorySchema =
      establishmentCategorySchema.parse(data);

    return parsedEstablishmentCategorySchema;
  }

  update(
    data: IUpdateEstablishmentCategoryUseCaseDataIn
  ): IUpdateEstablishmentCategoryUseCaseDataIn {
    const establishmentCategorySchema = zod.strictObject({
      id: zod.string({
        required_error: "Por favor, informe a categoria a ser atualizada."
      }).uuid({
        message: "Informe uma categoria válida.",
      }),
      name: zod
        .string()
        .min(1, {
          message: "Informe um nome válido.",
        })
        .optional(),
      description: zod
        .string()
        .min(1, {
          message: "Informe uma descrição válida.",
        })
        .optional(),
    });

    const parsedEstablishmentCategorySchema =
      establishmentCategorySchema.parse(data);

    return parsedEstablishmentCategorySchema;
  }

  getById(id: string): string {
    const establishmentCategorySchema = zod.string().uuid({
      message: "Informe uma categoria válida.",
    });

    const parsedEstablishmentCategorySchema =
      establishmentCategorySchema.parse(id);

    return parsedEstablishmentCategorySchema;
  }

  delete(id: string): string {
    const establishmentCategorySchema = zod.string().uuid({
      message: "Informe uma categoria válida.",
    });

    const parsedEstablishmentCategorySchema =
      establishmentCategorySchema.parse(id);

    return parsedEstablishmentCategorySchema;
  }
}
