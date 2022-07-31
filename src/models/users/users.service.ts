import { v4 as uuidv4 } from 'uuid';
import { encodePassword } from './utils';
import { Injectable } from '@nestjs/common';
import { User, UserWithPassword } from './dto/models';
import { PrismaService } from '../../prisma/prisma.service';
import {
	UpdateUserInput,
	FindOneUserInput,
	FindAllUsersInput,
	CreateUserEmailInput,
	CreateUserAddressInput,
} from './dto/inputs';

const select = {
	id: true,
	email: true,
	role: true,
	primaryWalletAddress: true,
	exchanges: {
		include: {
			exchange: true,
		},
	},
	createdAt: true,
	updatedAt: true,
};

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	findAll(findAllUsersInput: FindAllUsersInput): Promise<User[]> {
		const { skip, cursor, take, orderBy, where } = findAllUsersInput;
		return this.prisma.user.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
			select,
		});
	}

	async findOne(findOneUserInput: FindOneUserInput): Promise<User | null> {
		const { id, email, primaryWalletAddress } = findOneUserInput;

		return this.prisma.user.findUnique({
			where: { id, email, primaryWalletAddress },
			select,
		});
	}

	async _findOne(
		findOneUserInput: FindOneUserInput,
	): Promise<UserWithPassword | null> {
		const { id, email, primaryWalletAddress } = findOneUserInput;

		return this.prisma.user.findUnique({
			where: { id, email, primaryWalletAddress },
			select: { ...select, password: true },
		});
	}

	create(createUserEmailInput: CreateUserEmailInput): Promise<User> {
		const { email, password } = createUserEmailInput;
		const encodedPassword = encodePassword(password);
		const emailLowerCase = email.toLowerCase();

		return this.prisma.user.create({
			data: {
				email: emailLowerCase,
				password: encodedPassword,
			},
			select,
		});
	}

	async createOrGetFromAddress(
		createUserAddressInput: CreateUserAddressInput,
	): Promise<User> {
		const { primaryWalletAddress } = createUserAddressInput;
		let user;

		user = await this.findOne({ primaryWalletAddress });

		if (!user) {
			const password = uuidv4();
			const encodedPassword = encodePassword(password);
			user = this.prisma.user.create({
				data: {
					primaryWalletAddress,
					password: encodedPassword,
				},
				select,
			});
		}

		return user;
	}

	update(id: number, data: UpdateUserInput): Promise<User> {
		return this.prisma.user.update({
			where: {
				id,
			},
			data,
			select,
		});
	}

	delete(id: number): Promise<User> {
		return this.prisma.user.delete({
			where: {
				id,
			},
			select,
		});
	}
}
