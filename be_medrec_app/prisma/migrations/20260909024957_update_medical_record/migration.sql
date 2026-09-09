/*
  Warnings:

  - Added the required column `bloodTension` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `symptom` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `temperature` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `MedicalRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `medicalrecord` ADD COLUMN `bloodTension` VARCHAR(191) NOT NULL,
    ADD COLUMN `height` DOUBLE NOT NULL,
    ADD COLUMN `symptom` TEXT NOT NULL,
    ADD COLUMN `temperature` VARCHAR(191) NOT NULL,
    ADD COLUMN `weight` DOUBLE NOT NULL;
