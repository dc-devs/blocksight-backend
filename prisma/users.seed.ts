import { faker } from '@faker-js/faker';
import { UserRole } from '@prisma/client';

const users = [];

const firstUser = {
	email: 'davidc@prisma.io',
	password: '12345678',
	role: UserRole.SUPER_ADMIN,
};

const secondUser = {
	email: 'david@prisma.io',
	password: '12345678',
	role: UserRole.ADMIN,
};

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

export { firstUser, secondUser, users };
