import { IEstablishmentEntity } from "../../../../core/entities";
import { IEstablishmentRepositoryPort } from "../../../../core/ports";
import {
  ICreateEstablishmentRepositoryDataIn,
  IUpdateEstablishmentRepositoryDataIn,
} from "../../../../core/types";
import { prismaClient } from "../prismaClientConfiguration";

export class EstablishmentRepositoryAdapter
  implements IEstablishmentRepositoryPort
{
  async getByEmail(email: string): Promise<IEstablishmentEntity | null> {
    try {
      const establishment = await prismaClient.establishment.findUnique({
        where: {
          email,
        },
      });

      return establishment;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getById(id: string): Promise<IEstablishmentEntity | null> {
    try {
      const establishment = await prismaClient.establishment.findUnique({
        where: {
          id,
        },
      });

      return establishment;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getAll(): Promise<IEstablishmentEntity[]> {
    try {
      const establishments = await prismaClient.establishment.findMany();

      return establishments;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async create(
    data: ICreateEstablishmentRepositoryDataIn
  ): Promise<IEstablishmentEntity> {
    try {
      const establishment = await prismaClient.establishment.create({
        data,
      });

      return establishment;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async update(
    id: string,
    data: IUpdateEstablishmentRepositoryDataIn
  ): Promise<IEstablishmentEntity> {
    try {
      const establishment = await prismaClient.establishment.update({
        where: {
          id,
        },
        data,
      });

      return establishment;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async delete(id: string): Promise<IEstablishmentEntity> {
    try {
      const establishment = await prismaClient.establishment.delete({
        where: {
          id,
        },
      });

      return establishment;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
