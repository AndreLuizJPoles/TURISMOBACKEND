import { EstablishmentCategoryController } from "../api/express/controllers";
import { EstablishmentCategoryRepositoryAdapter } from "../database/prisma";

export interface IEstablishmentCategoryAssembler {
  establishmentCategoryController: EstablishmentCategoryController;
  establishmentCategoryRepository: EstablishmentCategoryRepositoryAdapter;
}
