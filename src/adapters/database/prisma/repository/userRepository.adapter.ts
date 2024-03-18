import { IUserEntity } from "../../../../core/entities";
import { IUserRepositoryPort } from "../../../../core/ports";
import {
  ICreateUserRepositoryDataIn,
  IUpdateUserRepositoryDataIn,
} from "../../../../core/types";
import { prismaClient } from "../prismaClientConfiguration";

export class UserRepositoryAdapter implements IUserRepositoryPort {
  async getByEmail(email: string): Promise<IUserEntity | null> {
    try {
      const user = await prismaClient.user.findUnique({
        where: {
          email,
        },
      });

      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getById(id: string): Promise<IUserEntity | null> {
    try {
      const user = await prismaClient.user.findUnique({
        where: {
          id,
        },
      });

      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async getAll(): Promise<IUserEntity[]> {
    try {
      const users = await prismaClient.user.findMany();

      return users;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async create(data: ICreateUserRepositoryDataIn): Promise<IUserEntity> {
    try {
      const user = await prismaClient.user.create({
        data,
      });

      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async update(
    id: string,
    data: IUpdateUserRepositoryDataIn
  ): Promise<IUserEntity> {
    try {
      const user = await prismaClient.user.update({
        where: {
          id,
        },
        data,
      });

      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async delete(id: string): Promise<IUserEntity> {
    try {
      const user = await prismaClient.user.delete({
        where: {
          id,
        },
      });

      return user;
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
