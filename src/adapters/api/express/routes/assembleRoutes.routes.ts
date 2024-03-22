import { Router } from "express";
import {
  userRouter,
  establishmentRouter,
  establishmentCategoryRouter,
  addressRouter,
} from ".";

export const mainRouter = Router();

mainRouter.use("/users", userRouter);
mainRouter.use("/establishments", establishmentRouter);
mainRouter.use("/establishmentCategories", establishmentCategoryRouter);
mainRouter.use("/addresses", addressRouter);
