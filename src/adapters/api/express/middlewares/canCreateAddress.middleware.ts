import { NextFunction, Request, Response } from "express";
import { loggedUser } from "../../../../core/utils/loggedUser.utils";
import { establishmentAssembler } from "../../../assembler";

const { establishmentRepository } = establishmentAssembler();

export const canCreateAddressMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const isCreatingForEstablishment = request.body.establishment_id;

  const establishment = isCreatingForEstablishment
    ? await establishmentRepository.getById(request.body.establishment_id)
    : null;

  if (establishment && establishment.user_id !== loggedUser.user?.id) {
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
