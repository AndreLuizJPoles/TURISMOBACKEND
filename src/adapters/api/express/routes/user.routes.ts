import { Request, Response, Router } from "express";
import { userAssembler } from "../../../assembler";
import { APIsAccessControlMiddleware } from "../middlewares";
import { IRole } from "../../../../core/types";
import { canManipulateUserMiddleware } from "../middlewares/canManipulateUser.middleware";

export const userRouter = Router();

const { userController } = userAssembler();

userRouter.get(
  "/",
  APIsAccessControlMiddleware.authentication,
  APIsAccessControlMiddleware.authorization({
    action: "read",
    resource: "user",
    roles: [IRole.ADMIN, IRole.USER],
  }),
  async (request: Request, response: Response) => {
    if (request.query?.email) {
      const email = request.query.email as string;

      const { status, ...data } = await userController.getUserByEmail(email);

      return response.status(status).json(data);
    }

    const { status, ...data } = await userController.getAllUsers();

    return response.status(status).json(data);
  }
);

userRouter.get(
  "/:id",
  APIsAccessControlMiddleware.authentication,
  APIsAccessControlMiddleware.authorization({
    action: "read",
    resource: "user",
    roles: [IRole.ADMIN, IRole.USER],
  }),
  async (request: Request, response: Response) => {
    const { id } = request.params;

    const { status, ...data } = await userController.getUserById(id);

    return response.status(status).json(data);
  }
);

userRouter.post("/", async (request: Request, response: Response) => {
  const userData = request.body;

  const { status, ...data } = await userController.createUser(userData);

  return response.status(status).json(data);
});

userRouter.put(
  "/",
  APIsAccessControlMiddleware.authentication,
  APIsAccessControlMiddleware.authorization({
    action: "update",
    resource: "user",
    roles: [IRole.ADMIN, IRole.USER],
  }),
  canManipulateUserMiddleware,
  async (request: Request, response: Response) => {
    const userData = request.body;

    const { status, ...data } = await userController.updateUser(userData);

    return response.status(status).json(data);
  }
);

userRouter.delete(
  "/",
  APIsAccessControlMiddleware.authentication,
  APIsAccessControlMiddleware.authorization({
    action: "delete",
    resource: "user",
    roles: [IRole.ADMIN, IRole.USER],
  }),
  canManipulateUserMiddleware,
  async (request: Request, response: Response) => {
    const { id } = request.body;

    const { status, ...data } = await userController.deleteUser(id);

    return response.status(status).json(data);
  }
);

userRouter.post("/login", async (request: Request, response: Response) => {
  const loginData = request.body;

  const { status, ...data } = await userController.login(loginData);

  return response.status(status).json(data);
});
