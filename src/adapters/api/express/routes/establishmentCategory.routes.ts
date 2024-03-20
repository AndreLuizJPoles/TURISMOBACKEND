import { Request, Response, Router } from "express";
import { establishmentCategoryAssembler } from "../../../assembler";
import { APIsAccessControlMiddleware } from "../middlewares";
import { IRole } from "../../../../core/types";

export const establishmentCategoryRouter = Router();

const { establishmentCategoryController } = establishmentCategoryAssembler();

establishmentCategoryRouter.post(
  "/",
  APIsAccessControlMiddleware.authentication,
  APIsAccessControlMiddleware.authorization({
    action: "create",
    resource: "establishmentCategory",
    roles: [IRole.ADMIN],
  }),
  async (request: Request, response: Response) => {
    const establishmentCategoryData = request.body;

    const { status, ...data } =
      await establishmentCategoryController.createEstablishmentCategory(
        establishmentCategoryData
      );

    return response.status(status).json(data);
  }
);

establishmentCategoryRouter.get(
  "/",
  APIsAccessControlMiddleware.authentication,
  APIsAccessControlMiddleware.authorization({
    action: "read",
    resource: "establishmentCategory",
    roles: [IRole.ADMIN, IRole.USER],
  }),
  async (request: Request, response: Response) => {
    const { status, ...data } =
      await establishmentCategoryController.getAllEstablishmentCategories();

    return response.status(status).json(data);
  }
);

establishmentCategoryRouter.put(
  "/",
  APIsAccessControlMiddleware.authentication,
  APIsAccessControlMiddleware.authorization({
    action: "update",
    resource: "establishmentCategory",
    roles: [IRole.ADMIN],
  }),
  async (request: Request, response: Response) => {
    const establishmentCategoryData = request.body;

    const { status, ...data } =
      await establishmentCategoryController.updateEstablishmentCategory(
        establishmentCategoryData
      );

    return response.status(status).json(data);
  }
);

establishmentCategoryRouter.get(
  "/:id",
  async (request: Request, response: Response) => {
    const { id } = request.params;

    const { status, ...data } =
      await establishmentCategoryController.getEstablishmentCategoryById(id);

    return response.status(status).json(data);
  }
);

establishmentCategoryRouter.delete(
  "/",
  APIsAccessControlMiddleware.authentication,
  APIsAccessControlMiddleware.authorization({
    action: "delete",
    resource: "establishmentCategory",
    roles: [IRole.ADMIN],
  }),
  async (request: Request, response: Response) => {
    const { id } = request.body;

    const { status, ...data } =
      await establishmentCategoryController.deleteEstablishmentCategory(id);

    return response.status(status).json(data);
  }
);
