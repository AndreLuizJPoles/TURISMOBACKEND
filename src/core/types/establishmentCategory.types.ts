import { IEstablishmentCategoryEntity } from "../entities";
import {
  CreateEstablishmentCategoryUseCase,
  DeleteEstablishmentCategoryUseCase,
  GetAllEstablishmentCategoriesUseCase,
  GetEstablishmentCategoryByIdUseCase,
  UpdateEstablishmentCategoryUseCase,
} from "../use-cases/establishmentCategory";

export type ICreateEstablishmentCategoryRepositoryDataIn = Omit<
  IEstablishmentCategoryEntity,
  "created_at" | "updated_at"
>;

export type IUpdateEstablishmentCategoryRepositoryDataIn = Partial<
  Omit<ICreateEstablishmentCategoryRepositoryDataIn, "id">
>;

export type ICreateEstablishmentCategoryUseCaseDataIn = Omit<
  ICreateEstablishmentCategoryRepositoryDataIn,
  "id"
>;

export interface IUpdateEstablishmentCategoryUseCaseDataIn
  extends Partial<IUpdateEstablishmentCategoryRepositoryDataIn> {
  id: string;
}

export interface IEstablishmentCategoryUseCases {
  getAllEstablishmentCategories: GetAllEstablishmentCategoriesUseCase;
  getEstablishmentCategoryById: GetEstablishmentCategoryByIdUseCase;
  createEstablishmentCategory: CreateEstablishmentCategoryUseCase;
  updateEstablishmentCategory: UpdateEstablishmentCategoryUseCase;
  deleteEstablishmentCategory: DeleteEstablishmentCategoryUseCase;
}
