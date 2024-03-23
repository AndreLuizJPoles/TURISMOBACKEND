import { EstablishmentContactController } from "../api/express/controllers";
import { EstablishmentContactRepositoryAdapter } from "../database/prisma";

export interface IEstablishmentContactAssembler {
  establishmentContactController: EstablishmentContactController;
  establishmentContactRepository: EstablishmentContactRepositoryAdapter;
}
