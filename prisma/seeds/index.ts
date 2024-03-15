import { PrismaClient } from "@prisma/client";
import { userSeeds } from "./user/user.seeds";
import { establishmentCategorySeeds } from "./establishmentCategory/establishmentCategory.seeds";

export const seedDatabase = async () => {
  const prismaClient = new PrismaClient();

  prismaClient.$connect();

  await prismaClient.user.createMany({
    data: await userSeeds(),
  });

  await prismaClient.establishmentCategory.createMany({
    data: establishmentCategorySeeds,
  });

  prismaClient.$disconnect();
};

seedDatabase();
