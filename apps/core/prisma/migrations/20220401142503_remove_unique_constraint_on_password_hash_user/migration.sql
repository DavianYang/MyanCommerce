/*
  Warnings:

  - A unique constraint covering the columns `[passwordResetToken]` on the table `Authentication` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Authentication_passwordHash_key";

-- CreateIndex
CREATE UNIQUE INDEX "Authentication_passwordResetToken_key" ON "Authentication"("passwordResetToken");
