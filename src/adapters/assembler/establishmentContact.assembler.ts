import { IEstablishmentContactUseCases } from "../../core/types";
import {
  DeleteEstablishmentContactUseCase,
  GetEstablishmentContactsByEstablishmentIdUseCase,
  GetEstablishmentContactByIdUseCase,
  UpdateEstablishmentContactUseCase,
} from "../../core/use-cases/establishmentContact";
import {
  EstablishmentContactController,
} from "../api/express/controllers";
import { EstablishmentContactRepositoryAdapter } from "../database/prisma";
import { IEstablishmentContactAssembler } from "../types";
import { EstablishmentContactAPIFieldsValidationAdapter } from "../utils";

export const establishmentContactAssembler =
  (): IEstablishmentContactAssembler => {
    const establishmentContactRepository =
      new EstablishmentContactRepositoryAdapter();
    const establishmentContactFieldsValidator =
      new EstablishmentContactAPIFieldsValidationAdapter();

    const establishmentContactUseCases: IEstablishmentContactUseCases = {
      deleteEstablishmentContact: new DeleteEstablishmentContactUseCase(
        establishmentContactRepository,
        establishmentContactFieldsValidator
      ),
      getEstablishmentContactById: new GetEstablishmentContactByIdUseCase(
        establishmentContactRepository,
        establishmentContactFieldsValidator
      ),
      updateEstablishmentContact: new UpdateEstablishmentContactUseCase(
        establishmentContactRepository,
        establishmentContactFieldsValidator
      ),
      getEstablishmentContactsByEstablishmentId:
        new GetEstablishmentContactsByEstablishmentIdUseCase(
          establishmentContactRepository,
          establishmentContactFieldsValidator
        ),
    };

    const establishmentContactController = new EstablishmentContactController(
      establishmentContactUseCases
    );

    return {
      establishmentContactController,
      establishmentContactRepository,
    };
  };
