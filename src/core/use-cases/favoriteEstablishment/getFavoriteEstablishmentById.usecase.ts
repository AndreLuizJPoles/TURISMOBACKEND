import { IFavoriteEstablishmentEntity } from "../../entities";
import {
  IFavoriteEstablishmentFieldsValidationPort,
  IFavoriteEstablishmentRepositoryPort,
} from "../../ports";
import { IHttpResponse } from "../../types";
import { HttpResponseUtils } from "../../utils";
import { loggedUser } from "../../utils/loggedUser.utils";
import { IDefaultUseCase } from "../default.usecase";

export class GetFavoriteEstablishmentByIdUseCase
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

      const favoriteEstablishment =
        await this.establishmentFavoriteRepositoryPort.getById(validatedId);

      if (!favoriteEstablishment) {
        return HttpResponseUtils.notFoundResponse();
      }

      if (favoriteEstablishment.user_id !== loggedUser.user?.id) {
        return HttpResponseUtils.unauthorizedRequestResponse();
      }

      return HttpResponseUtils.okResponse(favoriteEstablishment);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
