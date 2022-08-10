-- AlterTable
ALTER TABLE "UsersExchanges" ADD COLUMN     "apiKey" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "apiNickname" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "apiPassphrase" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "apiSecret" TEXT NOT NULL DEFAULT '';
