import { IFavoriteEstablishmentEntity } from "../../entities";
import {
  IFavoriteEstablishmentFieldsValidationPort,
  IFavoriteEstablishmentRepositoryPort,
} from "../../ports";
import { IHttpResponse } from "../../types";
import { HttpResponseUtils } from "../../utils";
import { IDefaultUseCase } from "../default.usecase";

export class DeleteFavoriteEstablishmentUseCase
  implements IDefaultUseCase<IHttpResponse, string>
{
  constructor(
    private establishmentFavoriteRepositoryPort: IFavoriteEstablishmentRepositoryPort,
    private fieldsValidatorPort: IFavoriteEstablishmentFieldsValidationPort
  ) {}

  async execute(
    id: string
  ): Promise<IHttpResponse<IFavoriteEstablishmentEntity>> {
    try {
      const validatedId = this.fieldsValidatorPort.validateById(id);

      const favoriteEstablishmentExists =
        await this.establishmentFavoriteRepositoryPort.getById(validatedId);

      if (!favoriteEstablishmentExists) {
        return HttpResponseUtils.notFoundResponse();
      }

      const favoriteEstablishment =
        await this.establishmentFavoriteRepositoryPort.delete(validatedId);

      return HttpResponseUtils.okResponse(favoriteEstablishment);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
