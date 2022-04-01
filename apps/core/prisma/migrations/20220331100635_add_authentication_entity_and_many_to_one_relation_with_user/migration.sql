/*
  Warnings:

  - You are about to drop the column `passwordHash` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordResetToken` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `verificationToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "passwordHash",
DROP COLUMN "passwordResetToken",
DROP COLUMN "verificationToken";

-- CreateTable
CREATE TABLE "Authentication" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "identifier" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "verificationToken" TEXT,
    "passwordResetToken" TEXT,
    "identifierChangeToken" TEXT,
    "pendingIdentifier" TEXT,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Authentication_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Authentication_identifier_key" ON "Authentication"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "Authentication_passwordHash_key" ON "Authentication"("passwordHash");

-- CreateIndex
CREATE UNIQUE INDEX "Authentication_verificationToken_key" ON "Authentication"("verificationToken");

-- CreateIndex
CREATE UNIQUE INDEX "Authentication_passwordResetToken_key" ON "Authentication"("passwordResetToken");

-- CreateIndex
CREATE UNIQUE INDEX "Authentication_identifierChangeToken_key" ON "Authentication"("identifierChangeToken");

-- CreateIndex
CREATE UNIQUE INDEX "Authentication_pendingIdentifier_key" ON "Authentication"("pendingIdentifier");

-- AddForeignKey
ALTER TABLE "Authentication" ADD CONSTRAINT "Authentication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
