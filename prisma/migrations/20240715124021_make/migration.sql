-- CreateTable
CREATE TABLE "soilMoistureData" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "moduleId" TEXT NOT NULL,
    "data" SMALLINT NOT NULL,

    CONSTRAINT "soilMoistureData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "soilMoistureData" ADD CONSTRAINT "soilMoistureData_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
