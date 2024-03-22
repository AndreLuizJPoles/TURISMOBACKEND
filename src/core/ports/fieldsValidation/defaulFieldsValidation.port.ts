export interface IDefaultFieldsValidationPort<
  CreatePayloadDataIn,
  UpdatePayloadDataIn
> {
  create: (data: CreatePayloadDataIn) => CreatePayloadDataIn;
  update: (data: UpdatePayloadDataIn) => UpdatePayloadDataIn;
  validateById: (id: string) => string;
}
