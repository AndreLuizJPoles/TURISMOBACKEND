import { IFavoriteEstablishmentEntity } from "../../../../core/entities";
import {
  ICreateFavoriteEstablishmentUseCaseDataIn,
  IFavoriteEstablishmentUseCases,
  IHttpResponse,
} from "../../../../core/types";

export class FavoriteEstablishmentController {
  constructor(
    private favoriteEstablishmentUseCases: IFavoriteEstablishmentUseCases
  ) {}

  async createFavoriteEstablishment(
    data: ICreateFavoriteEstablishmentUseCaseDataIn
  ): Promise<IHttpResponse<IFavoriteEstablishmentEntity>> {
    return this.favoriteEstablishmentUseCases.createFavoriteEstablishment.execute(
      data
    );
  }

  async getFavorieEstablishmentById(
    id: string
  ): Promise<IHttpResponse<IFavoriteEstablishmentEntity>> {
    return this.favoriteEstablishmentUseCases.getFavoriteEstablishmentById.execute(
      id
    );
  }

  async getFavoriteEstablishmentByEstablishmentId(
    establishment_id: string
  ): Promise<IHttpResponse<IFavoriteEstablishmentEntity>> {
    return this.favoriteEstablishmentUseCases.getFavoriteEstablishmentByEstablishmentId.execute(
      establishment_id
    );
  }

  async getFavoriteEstablishmentByUserId(
    user_id: string
  ): Promise<IHttpResponse<IFavoriteEstablishmentEntity[]>> {
    return this.favoriteEstablishmentUseCases.getFavoriteEstablishmentByUserId.execute(
      user_id
    );
  }

  async deleteFavoriteEstablishment(
    id: string
  ): Promise<IHttpResponse<IFavoriteEstablishmentEntity>> {
    return this.favoriteEstablishmentUseCases.deleteFavoriteEstablishment.execute(
      id
    );
  }
}
