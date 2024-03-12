import { Router } from "express";
import { userRouter } from "./user.routes";

export const mainRouter = Router();

mainRouter.use("/users", userRouter);
