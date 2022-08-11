import { users, exchanges, usersExchanges, fiatTransfers } from './seeds';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
	await prisma.user.createMany({
		data: [...users],
	});

	await prisma.exchange.createMany({
		data: [...exchanges],
	});

	await prisma.usersExchanges.createMany({
		data: [...usersExchanges],
	});

	await prisma.fiatTransfer.createMany({
		data: [...fiatTransfers],
	});
};

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
