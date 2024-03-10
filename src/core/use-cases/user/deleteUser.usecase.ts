import { IUserEntity } from "../../entities";
import { IUserRepositoryPort } from "../../ports/repository/user.repository";
import { IHttpResponse } from "../../types";
import { HttpResponseUtils } from "../../utils/httpResponse.utils";
import { IDefaultUseCase } from "../default.usecase";

export class DeleteUserUseCase
  implements IDefaultUseCase<IHttpResponse, string>
{
  constructor(private userRepositoryPort: IUserRepositoryPort) {}

  async execute(id: string): Promise<IHttpResponse<IUserEntity[]>> {
    try {
      const user = await this.userRepositoryPort.delete(id);

      if (!user) {
        return HttpResponseUtils.badRequestResponse();
      }

      return HttpResponseUtils.okResponse(user);
    } catch (error) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
