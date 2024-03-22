import { IEstablishmentCategoryUseCases } from "../../core/types";
import {
  CreateEstablishmentCategoryUseCase,
  DeleteEstablishmentCategoryUseCase,
  GetAllEstablishmentCategoriesUseCase,
  GetEstablishmentCategoryByIdUseCase,
  UpdateEstablishmentCategoryUseCase,
} from "../../core/use-cases/establishmentCategory";
import { EstablishmentCategoryController } from "../api/express/controllers";
import { EstablishmentCategoryRepositoryAdapter } from "../database/prisma";
import { IEstablishmentCategoryAssembler } from "../types/establishmentCategory.types";
import { EstablishmentCategoryAPIFieldsValidationAdapter } from "../utils";

export const establishmentCategoryAssembler =
  (): IEstablishmentCategoryAssembler => {
    const establishmentCategoryRepository =
      new EstablishmentCategoryRepositoryAdapter();
    const establishmentCategoryFieldsValidator =
      new EstablishmentCategoryAPIFieldsValidationAdapter();

    const establishmentCategoryUseCases: IEstablishmentCategoryUseCases = {
      createEstablishmentCategory: new CreateEstablishmentCategoryUseCase(
        establishmentCategoryRepository,
        establishmentCategoryFieldsValidator
      ),
      getAllEstablishmentCategories: new GetAllEstablishmentCategoriesUseCase(
        establishmentCategoryRepository
      ),
      updateEstablishmentCategory: new UpdateEstablishmentCategoryUseCase(
        establishmentCategoryRepository,
        establishmentCategoryFieldsValidator
      ),
      getEstablishmentCategoryById: new GetEstablishmentCategoryByIdUseCase(
        establishmentCategoryRepository,
        establishmentCategoryFieldsValidator
      ),
      deleteEstablishmentCategory: new DeleteEstablishmentCategoryUseCase(
        establishmentCategoryRepository,
        establishmentCategoryFieldsValidator
      ),
    };

    const establishmentCategoryController = new EstablishmentCategoryController(
      establishmentCategoryUseCases
    );

    return {
      establishmentCategoryController,
      establishmentCategoryRepository,
    };
  };
