/*
  Warnings:

  - Added the required column `email` to the `establishment_contacts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `establishment_contacts` ADD COLUMN `email` VARCHAR(191) NOT NULL;
