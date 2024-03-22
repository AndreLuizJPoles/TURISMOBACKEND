import { NextFunction, Request, Response } from "express";
import { addressAssembler, establishmentAssembler } from "../../../assembler";
import { loggedUser } from "../../../../core/utils/loggedUser.utils";

const { establishmentRepository } = establishmentAssembler();
const { addressRepository } = addressAssembler();

export const canManipulateAddressMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const address = await addressRepository.getById(request.body.id);

  const establishment = address?.establishment_id ? await establishmentRepository.getById(
    address?.establishment_id!
  ) : null

  if (
    establishment?.user_id === loggedUser.user?.id ||
    address?.user_id === loggedUser.user?.id
  ) {
    return next();
  }

  return response.status(401).json({
    message: "Ops! Ação não autorizada.",
  });
};
