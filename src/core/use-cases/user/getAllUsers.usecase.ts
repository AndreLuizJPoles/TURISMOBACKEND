import { IUserEntity } from "../../entities";
import { IUserRepositoryPort } from "../../ports/repository/user.repository";
import { IHttpResponse } from "../../types";
import { HttpResponseUtils } from "../../utils/httpResponse.utils";
import { IDefaultUseCase } from "../default.usecase";

export class GetAllUsersUseCase implements IDefaultUseCase<IHttpResponse> {
  constructor(private userRepositoryPort: IUserRepositoryPort) {}

  async execute(): Promise<IHttpResponse<IUserEntity[]>> {
    try {
      const users = await this.userRepositoryPort.getAll();

      if (!users.length) {
        return HttpResponseUtils.notFoundResponse();
      }

      return HttpResponseUtils.okResponse(users);
    } catch (error) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
