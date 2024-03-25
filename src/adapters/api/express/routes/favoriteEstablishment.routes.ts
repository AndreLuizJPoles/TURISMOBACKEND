import { Request, Response, Router } from "express";
import {
  APIsAccessControlMiddleware,
  canDeleteFavoriteEstablishmentMiddleware,
  canListFavoriteEstablishmentsByUserId,
  canManipulateEstablishmentMiddleware,
} from "../middlewares";
import { IRole } from "../../../../core/types";
import { favoriteEstablishmentAssembler } from "../../../assembler";

export const favoriteEstablishmentRouter = Router();

const { favoriteEstablishmentController } = favoriteEstablishmentAssembler();

favoriteEstablishmentRouter.get("/establishments/:establishmentId", async (request: Request, response: Response) => {
  const { establishmentId } = request.params

  const { status, ...data } =
    await favoriteEstablishmentController.getFavoriteEstablishmentByEstablishmentId(establishmentId);

  return response.status(status).json(data);
});

favoriteEstablishmentRouter.get(
  "/:id",
  APIsAccessControlMiddleware.authentication,
  APIsAccessControlMiddleware.authorization({
    action: "read",
    resource: "favoriteEstablishment",
    roles: [IRole.USER],
  }),
  async (request: Request, response: Response) => {
    const { id } = request.params;

    const { status, ...data } =
      await favoriteEstablishmentController.getFavorieEstablishmentById(id);

    return response.status(status).json(data);
  }
);

favoriteEstablishmentRouter.get(
  "/users/:userId",
  APIsAccessControlMiddleware.authentication,
  APIsAccessControlMiddleware.authorization({
    action: "read",
    resource: "favoriteEstablishment",
    roles: [IRole.USER],
  }),
  canListFavoriteEstablishmentsByUserId,
  async (request: Request, response: Response) => {
    const { userId } = request.params;

    const { status, ...data } =
      await favoriteEstablishmentController.getFavoriteEstablishmentByUserId(userId);

    return response.status(status).json(data);
  }
);

favoriteEstablishmentRouter.post(
  "/",
  APIsAccessControlMiddleware.authentication,
  APIsAccessControlMiddleware.authorization({
    action: "create",
    resource: "favoriteEstablishment",
    roles: [IRole.USER],
  }),
  canManipulateEstablishmentMiddleware,
  async (request: Request, response: Response) => {
    const favoriteEstablishmentData = request.body;

    const { status, ...data } =
      await favoriteEstablishmentController.createFavoriteEstablishment(favoriteEstablishmentData);

    return response.status(status).json(data);
  }
);

favoriteEstablishmentRouter.delete(
  "/",
  APIsAccessControlMiddleware.authentication,
  APIsAccessControlMiddleware.authorization({
    action: "delete",
    resource: "favoriteEstablishment",
    roles: [IRole.USER],
  }),
  canDeleteFavoriteEstablishmentMiddleware,
  async (request: Request, response: Response) => {
    const { id } = request.body;

    const { status, ...data } =
      await favoriteEstablishmentController.deleteFavoriteEstablishment(id);

    return response.status(status).json(data);
  }
);
