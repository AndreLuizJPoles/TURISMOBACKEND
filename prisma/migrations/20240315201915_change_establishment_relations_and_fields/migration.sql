-- AlterTable
ALTER TABLE `addresses` MODIFY `user_id` VARCHAR(191) NULL,
    MODIFY `establishment_id` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `establishments` MODIFY `status` BOOLEAN NOT NULL DEFAULT true;
