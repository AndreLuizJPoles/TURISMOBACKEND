import { IAddressEntity } from "../../../../core/entities";
import { IAddressRepositoryPort } from "../../../../core/ports";
import {
  IAddressEstablishment,
  ICreateAddressRepositoryDataIn,
  IUpdateAddressRepositoryDataIn,
} from "../../../../core/types";
import { prismaClient } from "../prismaClientConfiguration";

export class AddressRepositoryAdapter implements IAddressRepositoryPort {
  async getById(id: string): Promise<IAddressEntity | null> {
    try {
      const address = await prismaClient.address.findUnique({
        where: {
          id,
        },
      });

      return address;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getAll(): Promise<IAddressEntity[]> {
    try {
      const addresses = await prismaClient.address.findMany();

      return addresses;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async create(data: ICreateAddressRepositoryDataIn): Promise<IAddressEntity> {
    try {
      const address = await prismaClient.address.create({
        data,
      });

      return address;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async update(
    id: string,
    data: IUpdateAddressRepositoryDataIn
  ): Promise<IAddressEntity> {
    try {
      const address = await prismaClient.address.update({
        where: {
          id,
        },
        data,
      });

      return address;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async delete(id: string): Promise<IAddressEntity> {
    try {
      const address = await prismaClient.address.delete({
        where: {
          id,
        },
      });

      return address;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getByCEP(cep: string): Promise<IAddressEntity | null> {
    try {
      const address = await prismaClient.address.findFirst({
        where: {
          zip_code: cep,
        },
      });

      return address;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getByEstablishmentId(
    establishment_id: string
  ): Promise<IAddressEstablishment | null> {
    try {
      const address = await prismaClient.address.findUnique({
        where: {
          establishment_id,
        },
        include: {
          establishment: true,
        },
      });

      return address;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getByUserId(user_id: string): Promise<IAddressEntity[]> {
    try {
      const address = await prismaClient.address.findMany({
        where: {
          user_id,
        },
      });

      return address;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
