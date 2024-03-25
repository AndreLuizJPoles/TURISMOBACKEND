import { IFavoriteEstablishmentEntity } from "../../../../core/entities";
import { IFavoriteEstablishmentRepositoryPort } from "../../../../core/ports";
import { ICreateFavoriteEstablishmentRepositoryDataIn } from "../../../../core/types";
import { prismaClient } from "../prismaClientConfiguration";

export class FavoriteEstablishmentRepositoryAdapter
  implements IFavoriteEstablishmentRepositoryPort
{
  async getByUserId(user_id: string): Promise<IFavoriteEstablishmentEntity[]> {
    try {
      const favorites = await prismaClient.favoriteEstablishment.findMany({
        where: {
          user_id,
        },
      });

      return favorites;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getByEstablishmentId(
    establishment_id: string
  ): Promise<IFavoriteEstablishmentEntity[]> {
    try {
      const favorites = await prismaClient.favoriteEstablishment.findMany({
        where: {
          establishment_id,
        },
      });

      return favorites;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getById(id: string): Promise<IFavoriteEstablishmentEntity | null> {
    try {
      const favorite = await prismaClient.favoriteEstablishment.findUnique({
        where: {
          id,
        },
      });

      return favorite;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async create(
    data: ICreateFavoriteEstablishmentRepositoryDataIn
  ): Promise<IFavoriteEstablishmentEntity> {
    try {
      const favorite = await prismaClient.favoriteEstablishment.create({
        data,
      });

      return favorite;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async delete(id: string): Promise<IFavoriteEstablishmentEntity> {
    try {
      const favorite = await prismaClient.favoriteEstablishment.delete({
        where: {
          id,
        },
      });

      return favorite;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
