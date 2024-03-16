export interface IDefaultRepositoryPort<
  EntityReturn,
  CreateDataType,
  UpdateDataType
> {
  getAll: () => Promise<EntityReturn[]>;
  create: (data: CreateDataType) => Promise<EntityReturn>;
  update: (id: string, data: UpdateDataType) => Promise<EntityReturn>;
  delete: (id: string) => Promise<EntityReturn>;
}
