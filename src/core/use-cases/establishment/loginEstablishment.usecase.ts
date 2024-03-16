import { IEstablishmentEntity } from "../../entities";
import {
  IEstablishmentFieldsValidationPort,
  IEstablishmentRepositoryPort,
  IJwtTokenGeneratorPort,
  IPasswordHashPort,
} from "../../ports";
import { IHttpResponse, ILoginUseCaseDataIn, IRole } from "../../types";
import { HttpResponseUtils } from "../../utils";
import { IDefaultUseCase } from "../default.usecase";

export class LoginEstablishmentUseCase
  implements IDefaultUseCase<IHttpResponse, ILoginUseCaseDataIn>
{
  constructor(
    private establishmentRepositoryPort: IEstablishmentRepositoryPort,
    private fieldsValidatorPort: IEstablishmentFieldsValidationPort,
    private passwordHashPort: IPasswordHashPort,
    private jwtTokenGenerator: IJwtTokenGeneratorPort
  ) {}

  async execute(
    data: ILoginUseCaseDataIn
  ): Promise<IHttpResponse<IEstablishmentEntity>> {
    try {
      this.fieldsValidatorPort.login(data);

      const { email, password } = data;

      const establishment = await this.establishmentRepositoryPort.getByEmail(
        email
      );

      if (!establishment) {
        return HttpResponseUtils.notFoundResponse();
      }

      const isPasswordValid = await this.passwordHashPort.verify(
        password,
        establishment.password
      );

      if (!isPasswordValid) {
        return HttpResponseUtils.unauthorizedRequestResponse();
      }

      const jwtToken = this.jwtTokenGenerator.generateToken({
        id: establishment.id,
        role: IRole.ESTABLISHMENT,
      });

      return HttpResponseUtils.okResponse(jwtToken);
    } catch (error: any) {
      return HttpResponseUtils.internalServerErrorResponse(error);
    }
  }
}
