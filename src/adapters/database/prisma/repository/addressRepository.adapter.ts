import { IAddressEntity } from "../../../../core/entities";
import { IAddressRepositoryPort } from "../../../../core/ports";
import { ICreateAddressRepositoryDataIn, IUpdateAddressRepositoryDataIn } from "../../../../core/types";
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
}
