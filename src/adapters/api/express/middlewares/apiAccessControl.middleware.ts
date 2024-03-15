import { NextFunction, Request, Response } from "express";
import { userAssembler } from "../../../assembler";

const { userRepository, jwtTokenGenerator } = userAssembler();

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

    const user = await userRepository.getById(decodeToken.id);

    if (!user) {
      return response.status(404).json({
        message: "Ops! Dados não encontrados.",
      });
    }

    request.user = {
      user,
      type: "REGULAR",
    };

    return next();
  }
}
