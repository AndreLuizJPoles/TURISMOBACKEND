import { NextFunction, Request, Response } from "express";
import { loggedUser } from "../../../../core/utils/loggedUser.utils";

export const canManipulateUserMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userId = request.body.id;
  const loggedUserId = loggedUser.user?.id;

  if (userId !== loggedUserId) {
    return response.status(401).json({
      message: "Ops! Ação não autorizada",
    });
  }

  return next();
};
