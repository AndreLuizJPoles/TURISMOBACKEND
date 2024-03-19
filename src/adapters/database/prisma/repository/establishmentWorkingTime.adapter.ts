import { IEstablishmentWorkingTimeEntity } from "../../../../core/entities";
import { IEstablishmentWorkingTimeRepositoryPort } from "../../../../core/ports";
import {
  ICreateEstablishmentWorkingTimeRepositoryDataIn,
  IUpdateEstablishmentWorkingTimeRepositoryDataIn,
} from "../../../../core/types";
import { prismaClient } from "../prismaClientConfiguration";

export class EstablishmentWorkingTimeRepositoryAdapter
  implements IEstablishmentWorkingTimeRepositoryPort
{
  async getById(id: string): Promise<IEstablishmentWorkingTimeEntity | null> {
    try {
      const establishmentWorkingTime =
        await prismaClient.establishmentWorkingTime.findUnique({
          where: {
            id,
          },
        });

      return establishmentWorkingTime;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getAll(): Promise<IEstablishmentWorkingTimeEntity[]> {
    try {
      const establishmentsWorkingTime = await prismaClient.establishmentWorkingTime.findMany();

      return establishmentsWorkingTime;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async create(
    data: ICreateEstablishmentWorkingTimeRepositoryDataIn
  ): Promise<IEstablishmentWorkingTimeEntity> {
    try {
      const establishmentWorkingTime =
        await prismaClient.establishmentWorkingTime.create({
          data,
        });

      return establishmentWorkingTime;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async update(
    id: string,
    data: IUpdateEstablishmentWorkingTimeRepositoryDataIn
  ): Promise<IEstablishmentWorkingTimeEntity> {
    try {
      const establishmentWorkingTime =
        await prismaClient.establishmentWorkingTime.update({
          where: {
            id,
          },
          data,
        });

      return establishmentWorkingTime;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async delete(id: string): Promise<IEstablishmentWorkingTimeEntity> {
    try {
      const establishmentWorkingTime =
        await prismaClient.establishmentWorkingTime.delete({
          where: {
            id,
          },
        });

      return establishmentWorkingTime;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
