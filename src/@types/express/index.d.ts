import { IUserExpressRequest } from "../../adapters/types";

declare global {
  namespace Express {
    interface Request {
      user: IUserExpressRequest;
    }
  }
}
