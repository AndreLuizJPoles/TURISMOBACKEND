export interface IDefaultFieldsValidationPort<CreatePayloadDataIn, UpdatePayloadDataIn> {
  create: (data: CreatePayloadDataIn) => void | Error;
  update: (data: UpdatePayloadDataIn) => void | Error;
  getById: (id: string) => void | Error;
  delete: (id: string) => void | Error;
}
