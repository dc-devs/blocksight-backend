-- CreateTable
CREATE TABLE "FiatTransfer" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "currency" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "transferData" JSONB NOT NULL,
    "exchangeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FiatTransfer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "FiatTransfer_id_exchangeId_idx" ON "FiatTransfer"("id", "exchangeId");

-- AddForeignKey
ALTER TABLE "FiatTransfer" ADD CONSTRAINT "FiatTransfer_exchangeId_fkey" FOREIGN KEY ("exchangeId") REFERENCES "Exchange"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
