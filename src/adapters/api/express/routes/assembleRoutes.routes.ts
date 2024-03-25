import { Router } from "express";
import {
  userRouter,
  establishmentRouter,
  establishmentCategoryRouter,
  addressRouter,
  establishmentContactRouter,
  favoriteEstablishmentRouter,
} from ".";

export const mainRouter = Router();

mainRouter.use("/users", userRouter);
mainRouter.use("/establishments", establishmentRouter);
mainRouter.use("/establishmentCategories", establishmentCategoryRouter);
mainRouter.use("/addresses", addressRouter);
mainRouter.use("/establishmentContacts", establishmentContactRouter);
mainRouter.use("/favoriteEstablishments", favoriteEstablishmentRouter);
