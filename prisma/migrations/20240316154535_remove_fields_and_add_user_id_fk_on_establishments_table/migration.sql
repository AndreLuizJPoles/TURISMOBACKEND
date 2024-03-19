/*
  Warnings:

  - You are about to drop the column `email` on the `establishments` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `establishments` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `establishments` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `establishments_email_key` ON `establishments`;

-- AlterTable
ALTER TABLE `establishments` DROP COLUMN `email`,
    DROP COLUMN `password`,
    ADD COLUMN `user_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `establishments` ADD CONSTRAINT `establishments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
