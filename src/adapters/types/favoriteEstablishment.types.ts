import { FavoriteEstablishmentController } from "../api/express/controllers";
import { FavoriteEstablishmentRepositoryAdapter } from "../database/prisma";

export interface IFavoriteEstablishmentAssembler {
  favoriteEstablishmentController: FavoriteEstablishmentController;
  favoriteEstablishmentRepository: FavoriteEstablishmentRepositoryAdapter;
}
