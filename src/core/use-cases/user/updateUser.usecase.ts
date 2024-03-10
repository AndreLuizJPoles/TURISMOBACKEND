import { IUserEntity } from "../../entities";
import { IUserRepositoryPort } from "../../ports/repository/user.repository";
import {
  IHttpResponse,
  IUpdateUserRepositoryDataIn,
  IUpdateUserServiceDataIn,
} from "../../types";
import { HttpResponseUtils } from "../../utils/httpResponse.utils";
import { IDefaultUseCase } from "../default.usecase";

export class UpdateUserUseCase
  implements IDefaultUseCase<IHttpResponse, IUpdateUserServiceDataIn>
{
  constructor(private userRepositoryPort: IUserRepositoryPort) {}

  async execute(
    data: IUpdateUserServiceDataIn
  ): Promise<IHttpResponse<IUserEntity[]>> {
    try {
      const { id, ...userDataIn } = data;

      const user = await this.userRepositoryPort.update(id, userDataIn);

      if (!user) {
        return HttpResponseUtils.badRequestResponse();
      }

      return HttpResponseUtils.okResponse(user);
    } catch (error) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
