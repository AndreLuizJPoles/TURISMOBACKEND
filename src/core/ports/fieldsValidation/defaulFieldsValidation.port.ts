export interface IDefaultFieldsValidationPort<
  CreatePayloadDataIn,
  UpdatePayloadDataIn
> {
  create: (data: CreatePayloadDataIn) => CreatePayloadDataIn;
  update: (data: UpdatePayloadDataIn) => UpdatePayloadDataIn;
  getById: (id: string) => string;
  delete: (id: string) => string;
}
