import { faker } from '@faker-js/faker';
import { UserRole } from '@prisma/client';
import { encodePassword } from '../src/models/users/utils/bcrypt';

const users = [];

export const password = '12345678';

const firstUser = {
	email: 'davidc@prisma.io',
	password: encodePassword(password),
	role: UserRole.SUPER_ADMIN,
};
users.push(firstUser);

const secondUser = {
	email: 'david@prisma.io',
	password: encodePassword(password),
	role: UserRole.ADMIN,
};
users.push(secondUser);

const thirdUser = {
	email: 'dave@prisma.io',
	password: encodePassword(password),
	role: UserRole.ADMIN,
};
users.push(thirdUser);

let count = 1;
let userCount = 53;

while (count <= userCount) {
	const user = {
		email: faker.internet.email(),
		password: encodePassword(faker.internet.password()),
	};

	users.push(user);
	count += 1;
}

const allUsersCount = users.length;

export { firstUser, secondUser, thirdUser, users, allUsersCount };
