import { EstablishmentController } from "../api/express/controllers";
import { EstablishmentRepositoryAdapter } from "../database/prisma";

export interface IEstablishmentAssembler {
  establishmentController: EstablishmentController;
  establishmentRepository: EstablishmentRepositoryAdapter;
}
