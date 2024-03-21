import { NextFunction, Request, Response } from "express";
import { establishmentAssembler } from "../../../assembler";
import { loggedUser } from "../../../../core/utils/loggedUser.utils";

const { establishmentRepository } = establishmentAssembler();

export const canManipulateAddressMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (request.body.establishment_id && request.body.user_id) {
    return response.status(401).json({
      message: "Ops! Ação não autorizada.",
    });
  }

  const isCreatingForEstablishment = request.body.establishment_id;
  const establishment = await establishmentRepository.getById(
    request.body.establishment_id
  );
  const isEstablishmentOwner = establishment?.user_id === loggedUser.user?.id;

  if (isCreatingForEstablishment && (!establishment || !isEstablishmentOwner)) {
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
