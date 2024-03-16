import { Request, Response, Router } from "express";
import { APIsAccessControlMiddleware } from "../middlewares";
import { IRole } from "../../../../core/types";
import { establishmentAssembler } from "../../../assembler/establishment.assembler";

export const establishmentRouter = Router();

const { establishmentController } = establishmentAssembler();

establishmentRouter.get(
  "/",
  APIsAccessControlMiddleware.authentication,
  APIsAccessControlMiddleware.authorization({
    action: "read",
    resource: "establishment",
    roles: [IRole.ADMIN, IRole.ESTABLISHMENT, IRole.USER],
  }),
  async (request: Request, response: Response) => {
    const { status, ...data } =
      await establishmentController.getAllEstablishments();

    return response.status(status).json(data);
  }
);

establishmentRouter.get(
  "/:id",
  APIsAccessControlMiddleware.authentication,
  APIsAccessControlMiddleware.authorization({
    action: "read",
    resource: "establishment",
    roles: [IRole.ADMIN, IRole.ESTABLISHMENT, IRole.USER],
  }),
  async (request: Request, response: Response) => {
    const { id } = request.params;

    const { status, ...data } =
      await establishmentController.getEstablishmentById(id);

    return response.status(status).json(data);
  }
);

establishmentRouter.post("/", async (request: Request, response: Response) => {
  const establishmentData = request.body;

  const { status, ...data } = await establishmentController.createEstablishment(
    establishmentData
  );

  return response.status(status).json(data);
});

establishmentRouter.put(
  "/",
  APIsAccessControlMiddleware.authentication,
  APIsAccessControlMiddleware.authorization({
    action: "update",
    resource: "establishment",
    roles: [IRole.ESTABLISHMENT],
  }),
  async (request: Request, response: Response) => {
    const establishmentData = request.body;

    const { status, ...data } =
      await establishmentController.updateEstablishment(establishmentData);

    return response.status(status).json(data);
  }
);

establishmentRouter.delete(
  "/",
  APIsAccessControlMiddleware.authentication,
  APIsAccessControlMiddleware.authorization({
    action: "delete",
    resource: "establishment",
    roles: [IRole.ESTABLISHMENT],
  }),
  async (request: Request, response: Response) => {
    const { id } = request.body;

    const { status, ...data } =
      await establishmentController.deleteEstablishment(id);

    return response.status(status).json(data);
  }
);

establishmentRouter.post(
  "/login",
  async (request: Request, response: Response) => {
    const loginData = request.body;

    const { status, ...data } = await establishmentController.login(loginData);

    return response.status(status).json(data);
  }
);
