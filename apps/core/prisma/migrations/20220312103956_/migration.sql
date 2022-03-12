/*
  Warnings:

  - Made the column `phoneNumber` on table `Customer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "phoneNumber" SET NOT NULL;
