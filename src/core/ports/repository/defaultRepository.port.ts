export interface IDefaultRepositoryPort<
  EntityReturn,
  CreateDataType,
  UpdateDataType
> {
  getAll: () => Promise<EntityReturn[]>;
  getById: (id: string) => Promise<EntityReturn | null>;
  create: (data: CreateDataType) => Promise<EntityReturn>;
  update: (id: string, data: UpdateDataType) => Promise<EntityReturn>;
  delete: (id: string) => Promise<EntityReturn>;
}
