import crypto from 'crypto';
import { ethers } from 'ethers';
import { faker } from '@faker-js/faker';
import { UserRole } from '@prisma/client';
import { encodePassword } from '../src/models/users/utils/bcrypt';

const generateWalletAddess = () => {
	const id = crypto.randomBytes(32).toString('hex');
	const privateKey = `0x${id}`;
	const wallet = new ethers.Wallet(privateKey);

	return wallet.address;
};

const users = [];

export const password = '12345678';

const firstUser = {
	email: 'davidc@prisma.io',
	primaryWalletAddress: generateWalletAddess(),
	password: encodePassword(password),
	role: UserRole.SUPER_ADMIN,
};
users.push(firstUser);

const secondUser = {
	email: 'david@prisma.io',
	primaryWalletAddress: generateWalletAddess(),
	password: encodePassword(password),
	role: UserRole.ADMIN,
};
users.push(secondUser);

const thirdUser = {
	email: 'dave@prisma.io',
	primaryWalletAddress: generateWalletAddess(),
	password: encodePassword(password),
	role: UserRole.ADMIN,
};
users.push(thirdUser);

const fourthUser = {
	email: 'davidcMeta@prisma.io',
	primaryWalletAddress: generateWalletAddess(),
	password: encodePassword(password),
	role: UserRole.ADMIN,
};
users.push(fourthUser);

let count = 1;
let userCount = 53;

while (count <= userCount) {
	const user = {
		email: faker.internet.email(),
		primaryWalletAddress: generateWalletAddess(),
		password: encodePassword(faker.internet.password()),
	};

	users.push(user);
	count += 1;
}

const allUsersCount = users.length;

export { firstUser, secondUser, thirdUser, fourthUser, users, allUsersCount };
