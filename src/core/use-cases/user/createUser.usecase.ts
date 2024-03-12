import { IUserEntity } from "../../entities";
import { IUserRepositoryPort } from "../../ports/repository";
import {
  IHttpResponse,
  ICreateUserRepositoryDataIn,
  ICreateUserServiceDataIn,
} from "../../types";
import { HttpResponseUtils } from "../../utils";
import { IDefaultUseCase } from "../default.usecase";
import crypto from "crypto";
import zod from "zod";

export class CreateUserUseCase
  implements IDefaultUseCase<IHttpResponse, ICreateUserServiceDataIn>
{
  constructor(private userRepositoryPort: IUserRepositoryPort) {}

  async execute(
    data: ICreateUserServiceDataIn
  ): Promise<IHttpResponse<IUserEntity>> {
    try {
      const userSchema = zod.object({
        name: zod.string(),
        email: zod.string().email(),
        gender: zod.enum(["male", "female"], {
          description: "Escolha masculino ou feminino.",
        }),
        cpf: zod
          .string()
          .length(11, "O CPF digitado não possui 11 caracteres."),
        password: zod.string().min(8, {
          message: "Sua senha deve ter pelo menos 8 caracteres.",
        }),
        picture_url: zod.string(),
        phone_number: zod.string(),
      });

      userSchema.parse(data);

      const id = crypto.randomUUID();

      const user_repository_data: ICreateUserRepositoryDataIn = {
        ...data,
        id,
      };

      const user = await this.userRepositoryPort.create(user_repository_data);

      if (!user) {
        return HttpResponseUtils.badRequestResponse();
      }

      return HttpResponseUtils.createdResponse(user);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
