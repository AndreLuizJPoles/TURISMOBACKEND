import { IFavoriteEstablishmentEntity } from "../entities";
import {
  CreateFavoriteEstablishmentUseCase,
  DeleteFavoriteEstablishmentUseCase,
  GetFavoriteEstablishmentByEstablishmentIdUseCase,
  GetFavoriteEstablishmentByIdUseCase,
} from "../use-cases/favoriteEstablishment";
import { GetFavoriteEstablishmentByUserIdUseCase } from "../use-cases/favoriteEstablishment/getFavoriteEstablishmentByUserId.usecase";

export type ICreateFavoriteEstablishmentRepositoryDataIn = Omit<
  IFavoriteEstablishmentEntity,
  "created_at" | "updated_at"
>;

export type ICreateFavoriteEstablishmentUseCaseDataIn = Omit<
  ICreateFavoriteEstablishmentRepositoryDataIn,
  "id" | "user_id"
>;

export interface IFavoriteEstablishmentUseCases {
  createFavoriteEstablishment: CreateFavoriteEstablishmentUseCase;
  deleteFavoriteEstablishment: DeleteFavoriteEstablishmentUseCase;
  getFavoriteEstablishmentByEstablishmentId: GetFavoriteEstablishmentByEstablishmentIdUseCase;
  getFavoriteEstablishmentByUserId: GetFavoriteEstablishmentByUserIdUseCase;
  getFavoriteEstablishmentById: GetFavoriteEstablishmentByIdUseCase;
}
