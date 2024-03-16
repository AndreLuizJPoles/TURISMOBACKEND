import {
  IPasswordHashPort,
  IUserRepositoryPort,
  IUserFieldsValidationPort,
  IJwtTokenGeneratorPort,
} from "../../ports";
import { IHttpResponse, ILoginUseCaseDataIn, IRole } from "../../types";
import { HttpResponseUtils } from "../../utils";
import { IDefaultUseCase } from "../default.usecase";

export class LoginUserUseCase
  implements IDefaultUseCase<IHttpResponse, ILoginUseCaseDataIn>
{
  constructor(
    private userRepositoryPort: IUserRepositoryPort,
    private fieldsValidatorPort: IUserFieldsValidationPort,
    private passwordHashPort: IPasswordHashPort,
    private jwtTokenGenerator: IJwtTokenGeneratorPort
  ) {}

  async execute(data: ILoginUseCaseDataIn): Promise<IHttpResponse<string>> {
    try {
      const validatedFields = this.fieldsValidatorPort.login(data);
      
      
      const { email, password } = validatedFields;

      const user = await this.userRepositoryPort.getByEmail(email);

      if (!user) {
        return HttpResponseUtils.notFoundResponse();
      }

      const isPasswordValid = await this.passwordHashPort.verify(
        password,
        user.password
      );

      if (!isPasswordValid) {
        return HttpResponseUtils.unauthorizedRequestResponse();
      }

      const jwtToken = this.jwtTokenGenerator.generateToken({
        id: user.id,
        role: IRole.USER,
      });

      return HttpResponseUtils.okResponse(jwtToken);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
