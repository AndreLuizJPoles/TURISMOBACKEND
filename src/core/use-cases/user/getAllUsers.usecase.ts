import { IUserEntity } from "../../entities";
import { IUserRepositoryPort } from "../../ports/repository";
import { IHttpResponse } from "../../types";
import { excludeFields } from "../../utils";
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

      const userDataFormatted = excludeFields(["password"], users);

      return HttpResponseUtils.okResponse(userDataFormatted);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
