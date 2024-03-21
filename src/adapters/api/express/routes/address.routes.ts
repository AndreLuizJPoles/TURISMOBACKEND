import { Request, Response, Router } from "express";
import { APIsAccessControlMiddleware, canManipulateAddressMiddleware } from "../middlewares";
import { IRole } from "../../../../core/types";
import { addressAssembler } from "../../../assembler";

export const addressRouter = Router();

const { addressController } = addressAssembler();

addressRouter.post(
  "/",
  APIsAccessControlMiddleware.authentication,
  APIsAccessControlMiddleware.authorization({
    action: "create",
    resource: "address",
    roles: [IRole.USER],
  }),
  canManipulateAddressMiddleware,
  async (request: Request, response: Response) => {
    const addressData = request.body;

    const { status, ...data } = await addressController.createAddress(
      addressData
    );

    return response.status(status).json(data);
  }
);
