import { faker } from '@faker-js/faker';
import { UserRole } from '@prisma/client';

const users = [];

const firstUser = {
	email: 'davidc@prisma.io',
	password: '12345678',
	role: UserRole.SUPER_ADMIN,
};
users.push(firstUser);

const secondUser = {
	email: 'david@prisma.io',
	password: '12345678',
	role: UserRole.ADMIN,
};
users.push(secondUser);

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

const allUsersCount = users.length;

export { firstUser, secondUser, users, allUsersCount };
