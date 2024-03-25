import { IFavoriteEstablishmentEntity } from "../../entities";
import {
  IFavoriteEstablishmentFieldsValidationPort,
  IFavoriteEstablishmentRepositoryPort,
} from "../../ports";
import { IHttpResponse } from "../../types";
import { HttpResponseUtils } from "../../utils";
import { IDefaultUseCase } from "../default.usecase";

export class GetFavoriteEstablishmentByUserIdUseCase
  implements IDefaultUseCase<IHttpResponse, string>
{
  constructor(
    private establishmentFavoriteRepositoryPort: IFavoriteEstablishmentRepositoryPort,
    private fieldsValidatorPort: IFavoriteEstablishmentFieldsValidationPort
  ) {}

  async execute(
    user_id: string
  ): Promise<IHttpResponse<IFavoriteEstablishmentEntity[]>> {
    try {
      const validatedId = this.fieldsValidatorPort.validateById(user_id);

      const favoriteEstablishments =
        await this.establishmentFavoriteRepositoryPort.getByUserId(validatedId);

      if (!favoriteEstablishments.length) {
        return HttpResponseUtils.notFoundResponse();
      }

      return HttpResponseUtils.okResponse(favoriteEstablishments);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
