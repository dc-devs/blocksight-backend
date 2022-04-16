import { PrismaClient, UserRole } from '@prisma/client';
const prisma = new PrismaClient();

const main = async () => {
	await prisma.user.createMany({
		data: [
			{
				email: `alice@prisma.io`,
				password: '12345678',
			},
			{
				email: `bob@prisma.io`,
				password: '12345678',
			},
			{
				email: `david@prisma.io`,
				password: '12345678',
				role: UserRole.ADMIN,
			},
			{
				email: `davidc@prisma.io`,
				password: '12345678',
				role: UserRole.SUPER_ADMIN,
			},
		],
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
