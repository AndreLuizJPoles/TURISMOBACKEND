import { IEstablishmentCategoryEntity } from "../../../../core/entities";
import { IEstablishmentCategoryRepositoryPort } from "../../../../core/ports/repository/establishmentCategory.port";
import {
  ICreateEstablishmentCategoryRepositoryDataIn,
  IUpdateEstablishmentCategoryRepositoryDataIn,
} from "../../../../core/types";
import { prismaClient } from "../prismaClientConfiguration";

export class EstablishmentCategoryRepositoryAdapter
  implements IEstablishmentCategoryRepositoryPort
{
  async getAll(): Promise<IEstablishmentCategoryEntity[]> {
    try {
      const establishmentCategories =
        await prismaClient.establishmentCategory.findMany();

      return establishmentCategories;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getById(id: string): Promise<IEstablishmentCategoryEntity | null> {
    try {
      const establishmentCategory =
        await prismaClient.establishmentCategory.findUnique({
          where: {
            id,
          },
        });

      return establishmentCategory;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async create(
    data: ICreateEstablishmentCategoryRepositoryDataIn
  ): Promise<IEstablishmentCategoryEntity> {
    try {
      const establishmentCategory =
        await prismaClient.establishmentCategory.create({
          data,
        });

      return establishmentCategory;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async update(
    id: string,
    data: IUpdateEstablishmentCategoryRepositoryDataIn
  ): Promise<IEstablishmentCategoryEntity> {
    try {
      const establishmentCategory =
        await prismaClient.establishmentCategory.update({
          where: {
            id,
          },
          data,
        });

      return establishmentCategory;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async delete(id: string): Promise<IEstablishmentCategoryEntity> {
    try {
      const establishmentCategory =
        await prismaClient.establishmentCategory.delete({
          where: {
            id,
          },
        });

      return establishmentCategory;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
