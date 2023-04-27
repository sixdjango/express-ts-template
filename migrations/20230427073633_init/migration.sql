/*
  Warnings:

  - Added the required column `dd` to the `Test` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Test` ADD COLUMN `dd` VARCHAR(255) NOT NULL;
