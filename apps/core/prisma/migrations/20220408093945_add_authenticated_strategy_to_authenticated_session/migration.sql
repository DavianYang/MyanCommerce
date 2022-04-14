/*
  Warnings:

  - Added the required column `authenticatedStrategy` to the `AuthenticatedSession` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AuthenticatedSession" ADD COLUMN     "authenticatedStrategy" TEXT NOT NULL;
