import { NextFunction, Request, Response } from "express";
import { loggedUser } from "../../../../core/utils/loggedUser.utils";

export const canListFavoriteEstablishmentsByUserId = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (request.params.userId !== loggedUser.user?.id) {
    return response.status(401).json({
      message: "Ops! Ação não autorizada.",
    });
  }

  return next();
};
