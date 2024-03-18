export interface IHttpResponse<UseCaseReturnData = any> {
  status: number;
  data?: UseCaseReturnData;
  message?: string;
  error?: string | Error;
}
