/*
  Warnings:

  - You are about to alter the column `waterLevel` on the `waterLevelData` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "waterLevelData" ALTER COLUMN "waterLevel" SET DATA TYPE INTEGER;
