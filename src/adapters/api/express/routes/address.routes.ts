import { Request, Response, Router } from "express";
import {
  APIsAccessControlMiddleware,
  canCreateAddressMiddleware,
  canManipulateAddressMiddleware,
} from "../middlewares";
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
  canCreateAddressMiddleware,
  async (request: Request, response: Response) => {
    const addressData = request.body;

    const { status, ...data } = await addressController.createAddress(
      addressData
    );

    return response.status(status).json(data);
  }
);

addressRouter.get("/", async (request: Request, response: Response) => {
  const { status, ...data } = await addressController.getAllAddresses();

  return response.status(status).json(data);
});

addressRouter.get(
  "/:id",
  APIsAccessControlMiddleware.authentication,
  APIsAccessControlMiddleware.authorization({
    action: "read",
    resource: "address",
    roles: [IRole.ADMIN, IRole.USER],
  }),
  async (request: Request, response: Response) => {
    const { id } = request.params;

    const { status, ...data } = await addressController.getAddressById(id);

    return response.status(status).json(data);
  }
);

addressRouter.put(
  "/",
  APIsAccessControlMiddleware.authentication,
  APIsAccessControlMiddleware.authorization({
    action: "update",
    resource: "address",
    roles: [IRole.USER],
  }),
  canManipulateAddressMiddleware,
  async (request: Request, response: Response) => {
    const addressData = request.body;

    const { status, ...data } = await addressController.updateAddress(
      addressData
    );

    return response.status(status).json(data);
  }
);

addressRouter.delete(
  "/",
  APIsAccessControlMiddleware.authentication,
  APIsAccessControlMiddleware.authorization({
    action: "delete",
    resource: "address",
    roles: [IRole.USER],
  }),
  canManipulateAddressMiddleware,
  async (request: Request, response: Response) => {
    const { id } = request.body;

    const { status, ...data } = await addressController.deleteAddress(id);

    return response.status(status).json(data);
  }
);
