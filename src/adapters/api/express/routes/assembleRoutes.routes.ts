import { Router } from "express";
import { userRouter } from "./user.routes";
import { establishmentRouter } from "./establishment.routes";

export const mainRouter = Router();

mainRouter.use("/users", userRouter);
mainRouter.use("/establishments", establishmentRouter);
