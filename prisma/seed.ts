import { faker } from '@faker-js/faker';
import { PrismaClient, UserRole } from '@prisma/client';
const prisma = new PrismaClient();

let users = [];
let count = 1;
let userCount = 53;

while (count <= userCount) {
	const user = {
		email: faker.internet.email(),
		password: faker.internet.password(),
	};

	users.push(user);
	count += 1;
}

const main = async () => {
	await prisma.user.createMany({
		data: [
			{
				email: `davidc@prisma.io`,
				password: '12345678',
				role: UserRole.SUPER_ADMIN,
			},
			{
				email: `david@prisma.io`,
				password: '12345678',
				role: UserRole.ADMIN,
			},
			...users,
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
