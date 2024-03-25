import { randomUUID } from "crypto";
import { IFavoriteEstablishmentEntity } from "../../entities";
import {
  IFavoriteEstablishmentFieldsValidationPort,
  IFavoriteEstablishmentRepositoryPort,
} from "../../ports";
import { IHttpResponse } from "../../types";
import { ICreateFavoriteEstablishmentUseCaseDataIn } from "../../types/favoriteEstablishment.types";
import { HttpResponseUtils } from "../../utils";
import { IDefaultUseCase } from "../default.usecase";
import { loggedUser } from "../../utils/loggedUser.utils";

export class CreateFavoriteEstablishmentUseCase
  implements
    IDefaultUseCase<IHttpResponse, ICreateFavoriteEstablishmentUseCaseDataIn>
{
  constructor(
    private favoriteEstablishmentRepositoryPort: IFavoriteEstablishmentRepositoryPort,
    private fieldsValidationPort: IFavoriteEstablishmentFieldsValidationPort
  ) {}

  async execute(
    data: ICreateFavoriteEstablishmentUseCaseDataIn
  ): Promise<IHttpResponse<IFavoriteEstablishmentEntity>> {
    try {
      const { establishment_id } = data;

      const validateFields =
        this.fieldsValidationPort.validateById(establishment_id);

      const favoritedExists =
        await this.favoriteEstablishmentRepositoryPort.getByEstablishmentId(
          validateFields
        );

      if (favoritedExists) {
        return HttpResponseUtils.badRequestResponse(
          "O estabelecimento já foi favoritado"
        );
      }

      const favoritedEstablishment =
        await this.favoriteEstablishmentRepositoryPort.create({
          id: randomUUID(),
          user_id: loggedUser.user?.id!,
          ...data,
        });

      return HttpResponseUtils.createdResponse(favoritedEstablishment);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
