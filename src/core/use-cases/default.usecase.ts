export interface IDefaultUseCase<UseCaseResponse, DataType = any> {
  execute: (data: DataType) => Promise<UseCaseResponse>;
}
