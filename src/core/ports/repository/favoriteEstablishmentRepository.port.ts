import { IFavoriteEstablishmentEntity } from "../../entities";
import { ICreateFavoriteEstablishmentRepositoryDataIn } from "../../types/favoriteEstablishment.types";
import { IDefaultRepositoryPort } from "./defaultRepository.port";

export interface IFavoriteEstablishmentRepositoryPort
  extends Omit<
    IDefaultRepositoryPort<
      IFavoriteEstablishmentEntity,
      ICreateFavoriteEstablishmentRepositoryDataIn,
      any
    >,
    "update" | "getAll"
  > {
  getByUserId: (user_id: string) => Promise<IFavoriteEstablishmentEntity[]>;
  getByEstablishmentId: (
    establishment_id: string
  ) => Promise<IFavoriteEstablishmentEntity[]>;
}
