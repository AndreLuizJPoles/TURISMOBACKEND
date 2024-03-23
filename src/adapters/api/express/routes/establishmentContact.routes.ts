import { Request, Response, Router } from "express";
import {
  APIsAccessControlMiddleware,
  canManipulateEstablishmentContactMiddleware,
} from "../middlewares";
import { IRole } from "../../../../core/types";
import { establishmentContactAssembler } from "../../../assembler";

export const establishmentContactRouter = Router();

const { establishmentContactController } = establishmentContactAssembler();

establishmentContactRouter.get(
  "/establishments/:id",
  async (request: Request, response: Response) => {
    const { id } = request.params;

    const { status, ...data } =
      await establishmentContactController.getEstablishmentContactsByEstablishmentId(
        id
      );

    return response.status(status).json(data);
  }
);

establishmentContactRouter.get(
  "/:id",
  APIsAccessControlMiddleware.authentication,
  APIsAccessControlMiddleware.authorization({
    action: "read",
    resource: "establishmentContact",
    roles: [IRole.USER],
  }),
  canManipulateEstablishmentContactMiddleware,
  async (request: Request, response: Response) => {
    const { id } = request.params;

    const { status, ...data } =
      await establishmentContactController.getEstablishmentContactById(id);

    return response.status(status).json(data);
  }
);

establishmentContactRouter.put(
  "/",
  APIsAccessControlMiddleware.authentication,
  APIsAccessControlMiddleware.authorization({
    action: "update",
    resource: "establishmentContact",
    roles: [IRole.USER],
  }),
  canManipulateEstablishmentContactMiddleware,
  async (request: Request, response: Response) => {
    const establishmentContactData = request.body;

    const { status, ...data } =
      await establishmentContactController.updateEstablishmentContact(
        establishmentContactData
      );

    return response.status(status).json(data);
  }
);

establishmentContactRouter.delete(
  "/",
  APIsAccessControlMiddleware.authentication,
  APIsAccessControlMiddleware.authorization({
    action: "delete",
    resource: "establishmentContact",
    roles: [IRole.USER],
  }),
  canManipulateEstablishmentContactMiddleware,
  async (request: Request, response: Response) => {
    const { id } = request.body;

    const { status, ...data } =
      await establishmentContactController.deleteEstablishmentContact(id);

    return response.status(status).json(data);
  }
);
