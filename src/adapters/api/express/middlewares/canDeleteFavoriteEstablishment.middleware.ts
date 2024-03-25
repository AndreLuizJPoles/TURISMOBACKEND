import { NextFunction, Request, Response } from "express";
import {  favoriteEstablishmentAssembler } from "../../../assembler";
import { loggedUser } from "../../../../core/utils/loggedUser.utils";

const { favoriteEstablishmentRepository } = favoriteEstablishmentAssembler();

export const canDeleteFavoriteEstablishmentMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = request.body.id || request.body.establishment_id;

  const favoriteEstablishment = await favoriteEstablishmentRepository.getById(id);

  if (favoriteEstablishment?.user_id !== loggedUser.user!.id) {
    return response.status(401).json({
      message: "Ops! Ação não autorizada",
    });
  }

  return next();
};
