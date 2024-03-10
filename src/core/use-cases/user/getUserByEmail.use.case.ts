import { IUserEntity } from "../../entities";
import { IUserRepositoryPort } from "../../ports/repository/user.repository";
import { IHttpResponse } from "../../types";
import { HttpResponseUtils } from "../../utils/httpResponse.utils";
import { IDefaultUseCase } from "../default.usecase";

export class GetUserByEmailUseCase
  implements IDefaultUseCase<IHttpResponse, string>
{
  constructor(private userRepositoryPort: IUserRepositoryPort) {}

  async execute(email: string): Promise<IHttpResponse<IUserEntity>> {
    try {
      const user = await this.userRepositoryPort.getByEmail(email);

      if (!user) {
        return HttpResponseUtils.notFoundResponse();
      }

      return HttpResponseUtils.okResponse(user);
    } catch (error) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
