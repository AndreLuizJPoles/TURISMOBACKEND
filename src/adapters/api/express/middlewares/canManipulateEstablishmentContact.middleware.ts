import { NextFunction, Request, Response } from "express";
import { establishmentContactAssembler } from "../../../assembler";
import { loggedUser } from "../../../../core/utils/loggedUser.utils";

const { establishmentContactRepository } = establishmentContactAssembler();

export const canManipulateEstablishmentContactMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const establishmentContactId =
    request.method !== "GET" ? request.body.id : request.params.id;

  const establishmentContact =
    await establishmentContactRepository.getEstablishmentContactAndEstablishmentById(
      establishmentContactId
    );

  if (establishmentContact?.establishment?.user_id !== loggedUser.user?.id) {
    return response.status(401).json({
      message: "Ops! Ação não autorizada",
    });
  }

  return next();
};
