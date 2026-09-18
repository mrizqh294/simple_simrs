/*
  Warnings:

  - You are about to drop the column `recepsionistId` on the `visit` table. All the data in the column will be lost.
  - Added the required column `receptionistId` to the `Visit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `visit` DROP FOREIGN KEY `Visit_recepsionistId_fkey`;

-- DropIndex
DROP INDEX `Visit_recepsionistId_fkey` ON `visit`;

-- AlterTable
ALTER TABLE `visit` DROP COLUMN `recepsionistId`,
    ADD COLUMN `receptionistId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Visit` ADD CONSTRAINT `Visit_receptionistId_fkey` FOREIGN KEY (`receptionistId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
