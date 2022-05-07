import { PrismaClient } from '@prisma/client';
import { firstUser, secondUser, users } from './users.seed';

const prisma = new PrismaClient();

const main = async () => {
	await prisma.user.createMany({
		data: [firstUser, secondUser, ...users],
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
