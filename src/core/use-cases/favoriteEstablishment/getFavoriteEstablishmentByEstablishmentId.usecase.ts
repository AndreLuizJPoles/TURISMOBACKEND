import { IFavoriteEstablishmentEntity } from "../../entities";
import {
  IFavoriteEstablishmentFieldsValidationPort,
  IFavoriteEstablishmentRepositoryPort,
} from "../../ports";
import { IHttpResponse } from "../../types";
import { HttpResponseUtils } from "../../utils";
import { IDefaultUseCase } from "../default.usecase";

export class GetFavoriteEstablishmentByEstablishmentIdUseCase
  implements IDefaultUseCase<IHttpResponse, string>
{
  constructor(
    private establishmentFavoriteRepositoryPort: IFavoriteEstablishmentRepositoryPort,
    private fieldsValidatorPort: IFavoriteEstablishmentFieldsValidationPort
  ) {}

  async execute(
    establishment_id: string
  ): Promise<IHttpResponse<IFavoriteEstablishmentEntity>> {
    try {
      const validatedId = this.fieldsValidatorPort.validateById(establishment_id);

      const favoriteEstablishment =
        await this.establishmentFavoriteRepositoryPort.getByEstablishmentId(validatedId);

      if (!favoriteEstablishment) {
        return HttpResponseUtils.notFoundResponse();
      }

      return HttpResponseUtils.okResponse(favoriteEstablishment);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
