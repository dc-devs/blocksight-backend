import { User } from './models/user.model';
import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { encodePassword } from './utils/bcrypt';
import { UpdateUserInput } from './dto/update-user.input';
import { PrismaService } from '../../prisma/prisma.service';
import { FindOneUserInput } from './dto/find-one-user.input';
import { FindAllUsersInput } from './dto/find-all-users.input';
import { UserWithPassword } from './models/user-with-password.model';
import { CreateUserEmailInput } from './dto/create-user-email.input';
import { CreateUserAddressInput } from './dto/create-user-address.input';

const select = {
	id: true,
	email: true,
	primaryWalletAddress: true,
	role: true,
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

	create(createUserInput: CreateUserEmailInput): Promise<User> {
		const { email, password } = createUserInput;
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
		createUserInput: CreateUserAddressInput,
	): Promise<User> {
		const { primaryWalletAddress } = createUserInput;
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
