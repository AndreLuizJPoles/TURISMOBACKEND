import { NextFunction, Request, Response } from "express";
import { establishmentAssembler } from "../../../assembler";
import { loggedUser } from "../../../../core/utils/loggedUser.utils";

const { establishmentRepository } = establishmentAssembler();

export const canManipulateEstablishmentMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const establishmentId = request.body.id;

  const establishment = await establishmentRepository.getById(establishmentId);

  if (establishment?.user_id !== loggedUser.user!.id) {
    return response.status(401).json({
      message: "Ops! Ação não autorizada",
    });
  }

  return next();
};
