import { IUserEntity } from "../../entities";
import { IUserRepositoryPort } from "../../ports/repository";
import { IHttpResponse } from "../../types";
import { HttpResponseUtils } from "../../utils/httpResponse.utils";
import { IDefaultUseCase } from "../default.usecase";
import zod from "zod";

export class GetUserByEmailUseCase
  implements IDefaultUseCase<IHttpResponse, string>
{
  constructor(private userRepositoryPort: IUserRepositoryPort) {}

  async execute(email: string): Promise<IHttpResponse<IUserEntity>> {
    try {
      const userSchema = zod.string().email("O email digitado não é válido.");

      userSchema.parse(email)

      const user = await this.userRepositoryPort.getByEmail(email);

      if (!user) {
        return HttpResponseUtils.notFoundResponse();
      }

      return HttpResponseUtils.okResponse(user);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
