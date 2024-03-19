/*
  Warnings:

  - You are about to drop the `establishment_working_time` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `establishment_working_time` DROP FOREIGN KEY `establishment_working_time_establishment_id_fkey`;

-- DropTable
DROP TABLE `establishment_working_time`;

-- CreateTable
CREATE TABLE `establishments_working_time` (
    `id` VARCHAR(191) NOT NULL,
    `opening_time` VARCHAR(191) NOT NULL,
    `closing_time` VARCHAR(191) NOT NULL,
    `establishment_id` VARCHAR(191) NOT NULL,
    `open_on_sunday` BOOLEAN NOT NULL,
    `open_on_monday` BOOLEAN NOT NULL,
    `open_on_tuesday` BOOLEAN NOT NULL,
    `open_on_wednesday` BOOLEAN NOT NULL,
    `open_on_thursday` BOOLEAN NOT NULL,
    `open_on_friday` BOOLEAN NOT NULL,
    `open_on_saturday` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `establishments_working_time_establishment_id_key`(`establishment_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `establishments_working_time` ADD CONSTRAINT `establishments_working_time_establishment_id_fkey` FOREIGN KEY (`establishment_id`) REFERENCES `establishments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
