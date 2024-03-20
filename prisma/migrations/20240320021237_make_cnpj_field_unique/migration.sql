/*
  Warnings:

  - A unique constraint covering the columns `[cnpj]` on the table `establishments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `establishments_cnpj_key` ON `establishments`(`cnpj`);
