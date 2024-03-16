import { IEstablishmentUseCases } from "../../core/types";
import {
  CreateEstablishmentUseCase,
  DeleteEstablishmentUseCase,
  GetAllEstablishmentsUseCase,
  GetEstablishmentByIdUseCase,
  UpdateEstablishmentUseCase,
} from "../../core/use-cases/establishment";
import { LoginEstablishmentUseCase } from "../../core/use-cases/establishment/loginEstablishment.usecase";
import { EstablishmentController } from "../api/express/controllers";
import {
  AddressRepositoryAdapter,
  EstablishmentRepositoryAdapter,
  EstablishmentWorkingTimeRepositoryAdapter,
} from "../database/prisma";
import { IEstablishmentAssembler } from "../types";
import {
  EstablishmentAPIFieldsValidationAdapter,
  JwtTokenGeneratorAdapter,
  PasswordHashAdapter,
} from "../utils";

export const establishmentAssembler = (): IEstablishmentAssembler => {
  const establishmentRepository = new EstablishmentRepositoryAdapter();
  const addressRepository = new AddressRepositoryAdapter();
  const establishmentWorkingTimeRepository =
    new EstablishmentWorkingTimeRepositoryAdapter();
  const establishmentFieldsValidator =
    new EstablishmentAPIFieldsValidationAdapter();
  const passwordHash = new PasswordHashAdapter();
  const jwtTokenGenerator = new JwtTokenGeneratorAdapter();

  const establishmentUseCases: IEstablishmentUseCases = {
    createEstablishment: new CreateEstablishmentUseCase(
      establishmentRepository,
      addressRepository,
      establishmentWorkingTimeRepository,
      establishmentFieldsValidator,
      passwordHash
    ),
    deleteEstablishment: new DeleteEstablishmentUseCase(
      establishmentRepository,
      establishmentFieldsValidator
    ),
    getAllEstablishments: new GetAllEstablishmentsUseCase(
      establishmentRepository
    ),
    getEstablishmentById: new GetEstablishmentByIdUseCase(
      establishmentRepository,
      establishmentFieldsValidator
    ),
    updateEstablishment: new UpdateEstablishmentUseCase(
      establishmentRepository,
      addressRepository,
      establishmentWorkingTimeRepository,
      establishmentFieldsValidator
    ),
    loginEstablishment: new LoginEstablishmentUseCase(
      establishmentRepository,
      establishmentFieldsValidator,
      passwordHash,
      jwtTokenGenerator
    ),
  };

  const establishmentController = new EstablishmentController(
    establishmentUseCases
  );

  return {
    establishmentController,
    establishmentRepository
  };
};
