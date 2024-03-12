import { IUserEntity } from "../../entities";
import { IUserRepositoryPort } from "../../ports/repository";
import { IHttpResponse } from "../../types";
import { HttpResponseUtils } from "../../utils/httpResponse.utils";
import { IDefaultUseCase } from "../default.usecase";
import zod from "zod";

export class GetUserByIdUseCase
  implements IDefaultUseCase<IHttpResponse, string>
{
  constructor(private userRepositoryPort: IUserRepositoryPort) {}

  async execute(id: string): Promise<IHttpResponse<IUserEntity>> {
    try {
      const userSchema = zod.string().uuid("O ID informado não é válido.");

      userSchema.parse(id);

      const user = await this.userRepositoryPort.getById(id);

      if (!user) {
        return HttpResponseUtils.notFoundResponse();
      }

      return HttpResponseUtils.okResponse(user);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
