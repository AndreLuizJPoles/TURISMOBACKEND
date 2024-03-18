import { Router } from "express";
import {
  userRouter,
  establishmentRouter,
  establishmentCategoryRouter,
} from ".";

export const mainRouter = Router();

mainRouter.use("/users", userRouter);
mainRouter.use("/establishments", establishmentRouter);
mainRouter.use("/establishmentCategories", establishmentCategoryRouter);
