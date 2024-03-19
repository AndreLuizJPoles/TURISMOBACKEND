-- DropForeignKey
ALTER TABLE `addresses` DROP FOREIGN KEY `addresses_establishment_id_fkey`;

-- DropForeignKey
ALTER TABLE `addresses` DROP FOREIGN KEY `addresses_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_establishment_id_fkey`;

-- DropForeignKey
ALTER TABLE `comments` DROP FOREIGN KEY `comments_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `establishment_contacts` DROP FOREIGN KEY `establishment_contacts_establishment_id_fkey`;

-- DropForeignKey
ALTER TABLE `establishment_working_time` DROP FOREIGN KEY `establishment_working_time_establishment_id_fkey`;

-- DropForeignKey
ALTER TABLE `establishments` DROP FOREIGN KEY `establishments_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `favorite_establishments` DROP FOREIGN KEY `favorite_establishments_establishment_id_fkey`;

-- DropForeignKey
ALTER TABLE `favorite_establishments` DROP FOREIGN KEY `favorite_establishments_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `establishments` ADD CONSTRAINT `establishments_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `establishment_categories`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `establishment_contacts` ADD CONSTRAINT `establishment_contacts_establishment_id_fkey` FOREIGN KEY (`establishment_id`) REFERENCES `establishments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `establishment_working_time` ADD CONSTRAINT `establishment_working_time_establishment_id_fkey` FOREIGN KEY (`establishment_id`) REFERENCES `establishments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_establishment_id_fkey` FOREIGN KEY (`establishment_id`) REFERENCES `establishments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `comments` ADD CONSTRAINT `comments_establishment_id_fkey` FOREIGN KEY (`establishment_id`) REFERENCES `establishments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorite_establishments` ADD CONSTRAINT `favorite_establishments_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorite_establishments` ADD CONSTRAINT `favorite_establishments_establishment_id_fkey` FOREIGN KEY (`establishment_id`) REFERENCES `establishments`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
