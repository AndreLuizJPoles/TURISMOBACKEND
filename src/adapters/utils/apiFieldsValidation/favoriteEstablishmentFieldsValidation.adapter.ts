import { IFavoriteEstablishmentFieldsValidationPort } from "../../../core/ports";
import zod from "zod";

export class FavoriteEstablishmentAPIFieldsValidationAdapter
  implements IFavoriteEstablishmentFieldsValidationPort
{
  validateById(establishment_id: string): string {
    const favoriteEstablishmentSchema = zod
      .string({
        required_error: "Informe um estabelecimento.",
      })
      .uuid("O ID informado não é válido.");

    const parsedFavoriteEstablishmentSchema =
      favoriteEstablishmentSchema.parse(establishment_id);

    return parsedFavoriteEstablishmentSchema;
  }
}
