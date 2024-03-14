export interface IDefaultFieldsValidationPort {
  create: <PayloadDataIn>(data: PayloadDataIn) => void | Error;
  update: <PayloadDataIn>(data: PayloadDataIn) => void | Error;
  getById: (id: string) => void | Error;
  delete: (id: string) => void | Error;
}
