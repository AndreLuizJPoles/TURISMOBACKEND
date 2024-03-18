import { IEstablishmentCategoryEntity } from "../../entities";
import {
  ICreateEstablishmentCategoryRepositoryDataIn,
  IUpdateEstablishmentCategoryRepositoryDataIn,
} from "../../types";
import { IDefaultRepositoryPort } from "./defaultRepository.port";

export interface IEstablishmentCategoryRepositoryPort
  extends IDefaultRepositoryPort<
    IEstablishmentCategoryEntity,
    ICreateEstablishmentCategoryRepositoryDataIn,
    IUpdateEstablishmentCategoryRepositoryDataIn
  > {}
