import { NextFunction, Request, Response } from "express";
import { userAssembler, establishmentAssembler } from "../../../assembler";
import { IAuthorizationParameters, IPermission } from "../../../types";

const { userRepository, jwtTokenGenerator } = userAssembler();
const { establishmentRepository } = establishmentAssembler()

const permissions: IPermission = {
  ADMIN: {
    user: ["update", "delete", "read"],
    establishment: ["read"],
  },
  ESTABLISHMENT: {
    user: ["read"],
    establishment: ["update", "delete", "read"],
  },
  USER: {
    user: ["update", "delete", "read"],
    establishment: ["read"],
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
    const establishmentExists =
      decodeToken.role === "ESTABLISHMENT"
        ? await establishmentRepository.getById(decodeToken.id)
        : null;

    if (!userExists && !establishmentExists) {
      return response.status(404).json({
        message: "Ops! Dados não encontrados.",
      });
    }

    request.user = {
      user: userExists! || establishmentExists!,
      role: decodeToken.role,
    };

    return next();
  }

  static authorization(accessPolicy: IAuthorizationParameters) {
    const { action, resource, roles } = accessPolicy;

    return (request: Request, response: Response, next: NextFunction) => {
      if (!roles.includes(request.user.role)) {
        return response.status(401).json({
          message: "Ops! Ação não autorizada.",
        });
      }

      const { role } = request.user;

      const resourceExists = permissions[role][resource];
      const actionExists = permissions[role][resource]?.includes(action);

      if (!resourceExists || !actionExists) {
        return response.status(401).json({
          message: "Ops! Ação não autorizada.",
        });
      }

      return next();
    };
  }
}
