export interface IDefaultRepositoryPort<EntityReturn, DataType> {
  getAll: () => Promise<EntityReturn[]>;
  create: (data: DataType) => Promise<EntityReturn>;
  update: (id: string, data: Partial<DataType>) => Promise<EntityReturn>;
  delete: (id: string) => Promise<EntityReturn>;
}
