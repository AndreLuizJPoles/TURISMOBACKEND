import { NextFunction, Request, Response } from "express";
import { loggedUser } from "../../../../core/utils/loggedUser.utils";

export const canCreateAddressMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (request.body.establishment_id && request.body.user_id) {
    return response.status(401).json({
      message: "Ops! Ação não autorizada.",
    });
  }

  const isCreatingForUser = request.body.user_id;

  if (isCreatingForUser && request.body.user_id !== loggedUser.user?.id) {
    return response.status(401).json({
      message: "Ops! Ação não autorizada.",
    });
  }

  return next();
};
