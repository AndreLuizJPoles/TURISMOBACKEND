import { IFavoriteEstablishmentUseCases } from "../../core/types";
import {
  CreateFavoriteEstablishmentUseCase,
  DeleteFavoriteEstablishmentUseCase,
  GetFavoriteEstablishmentByEstablishmentIdUseCase,
  GetFavoriteEstablishmentByIdUseCase,
} from "../../core/use-cases/favoriteEstablishment";
import { GetFavoriteEstablishmentByUserIdUseCase } from "../../core/use-cases/favoriteEstablishment/getFavoriteEstablishmentByUserId.usecase";
import { FavoriteEstablishmentController } from "../api/express/controllers";
import { FavoriteEstablishmentRepositoryAdapter } from "../database/prisma";
import { IFavoriteEstablishmentAssembler } from "../types";
import { FavoriteEstablishmentAPIFieldsValidationAdapter } from "../utils";

export const favoriteEstablishmentAssembler =
  (): IFavoriteEstablishmentAssembler => {
    const favoriteEstablishmentRepository =
      new FavoriteEstablishmentRepositoryAdapter();
    const favoriteEstablishmentFieldsValidator =
      new FavoriteEstablishmentAPIFieldsValidationAdapter();

    const favoriteEstablishmentUseCases: IFavoriteEstablishmentUseCases = {
      createFavoriteEstablishment: new CreateFavoriteEstablishmentUseCase(
        favoriteEstablishmentRepository,
        favoriteEstablishmentFieldsValidator
      ),
      deleteFavoriteEstablishment: new DeleteFavoriteEstablishmentUseCase(
        favoriteEstablishmentRepository,
        favoriteEstablishmentFieldsValidator
      ),
      getFavoriteEstablishmentByEstablishmentId:
        new GetFavoriteEstablishmentByEstablishmentIdUseCase(
          favoriteEstablishmentRepository,
          favoriteEstablishmentFieldsValidator
        ),
      getFavoriteEstablishmentById: new GetFavoriteEstablishmentByIdUseCase(
        favoriteEstablishmentRepository,
        favoriteEstablishmentFieldsValidator
      ),
      getFavoriteEstablishmentByUserId:
        new GetFavoriteEstablishmentByUserIdUseCase(
          favoriteEstablishmentRepository,
          favoriteEstablishmentFieldsValidator
        ),
    };

    const favoriteEstablishmentController = new FavoriteEstablishmentController(
      favoriteEstablishmentUseCases
    );

    return {
      favoriteEstablishmentController,
      favoriteEstablishmentRepository,
    };
  };
