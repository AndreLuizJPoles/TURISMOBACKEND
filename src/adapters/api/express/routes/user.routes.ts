import { Request, Response, Router } from "express";
import { assembleUserController } from "../controllers";

export const userRouter = Router();

const userController = assembleUserController();

userRouter.get("/", async (request: Request, response: Response) => {
  if (request.query?.email) {
    const email = request.query.email as string;

    const { status, ...data } = await userController.getUserByEmail(email);

    return response.status(status).json(data);
  }

  const { status, ...data } = await userController.getAllUsers();

  return response.status(status).json(data);
});

userRouter.get("/", async (request: Request, response: Response) => {
  const { id } = request.body;

  const { status, ...data } = await userController.getUserById(id);

  return response.status(status).json(data);
});

userRouter.post("/", async (request: Request, response: Response) => {
  const userData = request.body;

  const { status, ...data } = await userController.createUser(userData);

  return response.status(status).json(data);
});

userRouter.put("/", async (request: Request, response: Response) => {
  const userData = request.body;

  const { status, ...data } = await userController.updateUser(userData);

  return response.status(status).json(data);
});

userRouter.delete("/", async (request: Request, response: Response) => {
  const id = request.body;

  const { status, ...data } = await userController.deleteUser(id);

  return response.status(status).json(data);
});

userRouter.post("/login", async (request: Request, response: Response) => {
  const loginData = request.body;

  const { status, ...data } = await userController.login(loginData);

  return response.status(status).json(data);
});
