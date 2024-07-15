/*
  Warnings:

  - You are about to drop the column `created_at` on the `voltageData` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `waterLevelData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "voltageData" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "waterLevelData" DROP COLUMN "created_at",
ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;
