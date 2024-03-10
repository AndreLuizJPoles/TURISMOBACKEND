import { IHttpResponse } from "../types";

export class HttpResponseUtils {
  static okResponse<DataType>(data: DataType): IHttpResponse {
    return {
      status: 200,
      data,
    };
  }

  static notFoundResponse(): IHttpResponse {
    return {
      status: 404,
      message: "Ops! Dados não encontrados.",
    };
  }

  static badRequestResponse(): IHttpResponse {
    return {
      status: 400,
      message: "Ops! Algo de errado aconteceu.",
    };
  }

  static createdResponse<DataType>(data: DataType): IHttpResponse {
    return {
      status: 201,
      data,
    };
  }

  static internalServerErrorResponse(error: string | Error): IHttpResponse {
    return {
      status: 500,
      error,
      message: "Ops! Algo aconteceu internamente.",
    };
  }
}
