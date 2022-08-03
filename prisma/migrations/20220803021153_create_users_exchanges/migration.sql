-- CreateTable
CREATE TABLE "UsersExchanges" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "exchangeId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UsersExchanges_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "UsersExchanges_id_userId_exchangeId_idx" ON "UsersExchanges"("id", "userId", "exchangeId");

-- AddForeignKey
ALTER TABLE "UsersExchanges" ADD CONSTRAINT "UsersExchanges_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersExchanges" ADD CONSTRAINT "UsersExchanges_exchangeId_fkey" FOREIGN KEY ("exchangeId") REFERENCES "Exchange"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
