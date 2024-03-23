import { IEstablishmentUseCases } from "../../core/types";
import {
  CreateEstablishmentUseCase,
  DeleteEstablishmentUseCase,
  GetAllEstablishmentsUseCase,
  GetEstablishmentByIdUseCase,
  UpdateEstablishmentUseCase,
} from "../../core/use-cases/establishment";
import { EstablishmentController } from "../api/express/controllers";
import {
  AddressRepositoryAdapter,
  EstablishmentRepositoryAdapter,
  EstablishmentWorkingTimeRepositoryAdapter,
} from "../database/prisma";
import { IEstablishmentAssembler } from "../types";
import { EstablishmentAPIFieldsValidationAdapter } from "../utils";
import { establishmentContactAssembler } from "./establishmentContact.assembler";

const { establishmentContactRepository } = establishmentContactAssembler()

export const establishmentAssembler = (): IEstablishmentAssembler => {
  const establishmentRepository = new EstablishmentRepositoryAdapter();
  const addressRepository = new AddressRepositoryAdapter();
  const establishmentWorkingTimeRepository =
    new EstablishmentWorkingTimeRepositoryAdapter();
  const establishmentFieldsValidator =
    new EstablishmentAPIFieldsValidationAdapter();

  const establishmentUseCases: IEstablishmentUseCases = {
    createEstablishment: new CreateEstablishmentUseCase(
      establishmentRepository,
      addressRepository,
      establishmentWorkingTimeRepository,
      establishmentContactRepository,
      establishmentFieldsValidator,
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
  };

  const establishmentController = new EstablishmentController(
    establishmentUseCases
  );

  return {
    establishmentController,
    establishmentRepository,
  };
};
