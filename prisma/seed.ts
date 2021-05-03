import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const main = async () => {
	await prisma.user.upsert({
		where: { email: 'alice@prisma.io' },
		update: {},
		create: {
			email: `alice@prisma.io`,
			firstName: 'Alice',
			lastName: 'McTesterson',
		},
	});

	await prisma.user.upsert({
		where: { email: 'bob@prisma.io' },
		update: {},
		create: {
			email: `bob@prisma.io`,
			firstName: 'Bob',
			lastName: 'McTesterson',
		},
	});

	await prisma.user.upsert({
		where: { email: 'david@prisma.io' },
		update: {},
		create: {
			email: `david@prisma.io`,
			firstName: 'David',
			lastName: 'Christian',
			// role: USER,
		},
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
