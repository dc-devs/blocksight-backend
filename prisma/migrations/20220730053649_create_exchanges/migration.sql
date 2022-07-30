-- CreateTable
CREATE TABLE "Exchange" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "websiteUrl" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "companyLogoUrl" TEXT NOT NULL,
    "hasApi" BOOLEAN NOT NULL,
    "hasCsv" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Exchange_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Exchange_name_key" ON "Exchange"("name");

-- CreateIndex
CREATE INDEX "Exchange_id_idx" ON "Exchange"("id");
