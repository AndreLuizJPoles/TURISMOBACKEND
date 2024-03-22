import { IEstablishmentContactEntity } from "../../../../core/entities";
import { IEstablishmentContactRepositoryPort } from "../../../../core/ports";
import {
  ICreateEstablishmentContactRepositoryDataIn,
  IUpdateEstablishmentContactRepositoryDataIn,
} from "../../../../core/types/establishmentContact.types";
import { prismaClient } from "../prismaClientConfiguration";

export class EstablishmentContactRepositoryAdapter
  implements IEstablishmentContactRepositoryPort
{
  async getAll(): Promise<IEstablishmentContactEntity[]> {
    try {
      const contacts = await prismaClient.establishmentContact.findMany();

      return contacts;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getById(id: string): Promise<IEstablishmentContactEntity | null> {
    try {
      const contact = await prismaClient.establishmentContact.findUnique({
        where: {
          id,
        },
      });

      return contact;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getByEstablishmentId(
    establishment_id: string
  ): Promise<IEstablishmentContactEntity[]> {
    try {
      const contacts = await prismaClient.establishmentContact.findMany({
        where: {
          establishment_id,
        },
      });

      return contacts;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async create(
    data: ICreateEstablishmentContactRepositoryDataIn
  ): Promise<IEstablishmentContactEntity> {
    try {
      const contact = await prismaClient.establishmentContact.create({
        data,
      });

      return contact;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async createMany(
    data: ICreateEstablishmentContactRepositoryDataIn[]
  ): Promise<void> {
    try {
      await prismaClient.establishmentContact.createMany({
        data,
      });
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async update(
    id: string,
    data: IUpdateEstablishmentContactRepositoryDataIn
  ): Promise<IEstablishmentContactEntity> {
    try {
      const contact = await prismaClient.establishmentContact.update({
        data,
        where: {
          id,
        },
      });

      return contact;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async delete(id: string): Promise<IEstablishmentContactEntity> {
    try {
      const contact = await prismaClient.establishmentContact.delete({
        where: {
          id,
        },
      });

      return contact;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
