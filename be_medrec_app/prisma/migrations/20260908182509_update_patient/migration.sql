/*
  Warnings:

  - A unique constraint covering the columns `[nik]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `address` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `birthdate` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nik` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `patient` ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `birthdate` DATE NOT NULL,
    ADD COLUMN `nik` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Patient_nik_key` ON `Patient`(`nik`);
