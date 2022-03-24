/*
  Warnings:

  - The `defaultShippingAddress` column on the `Address` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `addressId` on the `Country` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[countryId]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `countryId` to the `Address` table without a default value. This is not possible if the table is not empty.
  - Made the column `fullName` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Made the column `company` on table `Address` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `enabled` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Country` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Country" DROP CONSTRAINT "Country_addressId_fkey";

-- DropIndex
DROP INDEX "Country_addressId_key";

-- AlterTable
ALTER TABLE "Address" ADD COLUMN     "countryId" TEXT NOT NULL,
ALTER COLUMN "fullName" SET NOT NULL,
ALTER COLUMN "fullName" SET DEFAULT E'',
ALTER COLUMN "company" SET NOT NULL,
ALTER COLUMN "company" SET DEFAULT E'',
ALTER COLUMN "streetLine2" SET DEFAULT E'',
ALTER COLUMN "city" SET DEFAULT E'',
ALTER COLUMN "province" SET DEFAULT E'',
ALTER COLUMN "postalCode" SET DEFAULT E'',
ALTER COLUMN "phoneNumber" SET DEFAULT E'',
DROP COLUMN "defaultShippingAddress",
ADD COLUMN     "defaultShippingAddress" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "defaultBillingAddress" SET DEFAULT false;

-- AlterTable
ALTER TABLE "Country" DROP COLUMN "addressId",
ADD COLUMN     "enabled" BOOLEAN NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "deletedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Address_countryId_key" ON "Address"("countryId");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
