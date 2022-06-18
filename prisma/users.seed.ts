import { faker } from '@faker-js/faker';
import { UserRole } from '@prisma/client';
import generateWallet from '../src/utils/generate-wallet';
import { encodePassword } from '../src/models/users/utils/bcrypt';

const users = [];

export const password = '12345678';

const firstUserWallet = generateWallet();

const firstUser = {
	email: 'davidc@prisma.io',
	primaryWalletAddress: firstUserWallet.address,
	password: encodePassword(password),
	role: UserRole.SUPER_ADMIN,
};
users.push(firstUser);

const secondUserWallet = generateWallet();

const secondUser = {
	email: 'david@prisma.io',
	primaryWalletAddress: secondUserWallet.address,
	password: encodePassword(password),
	role: UserRole.ADMIN,
};
users.push(secondUser);

const thirdUserWallet = generateWallet();

const thirdUser = {
	email: 'dave@prisma.io',
	primaryWalletAddress: thirdUserWallet.address,
	password: encodePassword(password),
	role: UserRole.ADMIN,
};
users.push(thirdUser);

const fourthUserWallet = generateWallet();

const fourthUser = {
	email: 'davidcMeta@prisma.io',
	primaryWalletAddress: fourthUserWallet.address,
	password: encodePassword(password),
	role: UserRole.ADMIN,
};
users.push(fourthUser);

let count = 1;
let userCount = 53;

while (count <= userCount) {
	const user = {
		email: faker.internet.email(),
		primaryWalletAddress: generateWallet().address,
		password: encodePassword(faker.internet.password()),
	};

	users.push(user);
	count += 1;
}

const allUsersCount = users.length;

export {
	users,
	firstUser,
	secondUser,
	thirdUser,
	fourthUser,
	allUsersCount,
	fourthUserWallet,
};
