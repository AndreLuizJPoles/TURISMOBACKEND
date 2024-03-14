import { IUserEntity } from "../../entities";
import { IUserRepositoryPort } from "../../ports/repository";
import { IHttpResponse, IUpdateUserServiceDataIn } from "../../types";
import { excludeFields } from "../../utils";
import { HttpResponseUtils } from "../../utils/httpResponse.utils";
import { IDefaultUseCase } from "../default.usecase";
import zod from "zod";
export class UpdateUserUseCase
  implements IDefaultUseCase<IHttpResponse, IUpdateUserServiceDataIn>
{
  constructor(private userRepositoryPort: IUserRepositoryPort) {}

  async execute(
    data: IUpdateUserServiceDataIn
  ): Promise<IHttpResponse<IUserEntity>> {
    try {
      const userSchema = zod.object({
        id: zod.string().uuid("O ID informado não é válido."),
        name: zod.string().optional(),
        gender: zod
          .enum(["male", "female"], {
            description: "Escolha masculino ou feminino.",
          })
          .optional(),
        cpf: zod
          .string()
          .length(11, "O CPF digitado não possui 11 caracteres.")
          .optional(),
        picture_url: zod.string().optional(),
        phone_number: zod.string().optional(),
      });

      userSchema.parse(data);

      const { id, ...userDataIn } = data;

      const user = await this.userRepositoryPort.update(id, userDataIn);

      if (!user) {
        return HttpResponseUtils.badRequestResponse();
      }

      const userDataFormatted = excludeFields(["password"], user);

      return HttpResponseUtils.okResponse(userDataFormatted);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
