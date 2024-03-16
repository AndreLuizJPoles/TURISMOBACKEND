import { NextFunction, Request, Response } from "express";
import { userAssembler } from "../../../assembler";
import { IAuthorizationParameters, IPermission } from "../../../types";
import { loggedUser } from "../../../../core/utils/loggedUser.utils";

const { userRepository, jwtTokenGenerator } = userAssembler();

const permissions: IPermission = {
  ADMIN: {
    user: ["update", "delete", "read"],
  },
  USER: {
    user: ["update", "delete", "read"],
    establishment: ["read", "update", "create", "delete"],
  },
};

export class APIsAccessControlMiddleware {
  static async authentication(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const token = request.headers.authorization?.split("Bearer ")[1];

    if (!token) {
      return response.status(401).json({
        message: "Ops! Ação não autorizada.",
      });
    }

    const decodeToken = jwtTokenGenerator.decodeToken(token);

    if (!decodeToken) {
      return response.status(401).json({
        message: "Ops! Ação não autorizada.",
      });
    }

    const userExists =
      decodeToken.role === "USER"
        ? await userRepository.getById(decodeToken.id)
        : null;

    if (!userExists) {
      return response.status(404).json({
        message: "Ops! Dados não encontrados.",
      });
    }

    loggedUser.user = userExists;
    loggedUser.role = decodeToken.role;

    return next();
  }

  static authorization(accessPolicy: IAuthorizationParameters) {
    const { action, resource, roles } = accessPolicy;

    return (request: Request, response: Response, next: NextFunction) => {
      if (!roles.includes(loggedUser.role!)) {
        return response.status(401).json({
          message: "Ops! Ação não autorizada.",
        });
      }

      const { role } = loggedUser;

      const resourceExists = permissions[role!][resource];
      const actionExists = permissions[role!][resource]?.includes(action);

      if (!resourceExists || !actionExists) {
        return response.status(401).json({
          message: "Ops! Ação não autorizada.",
        });
      }

      return next();
    };
  }
}
