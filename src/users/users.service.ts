import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { encodePassword } from './utils/bcrypt';
import { GetUserInput } from './dto/get-user.input';
import { GetUsersInput } from './dto/get-users.input';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { UserWithPassword } from './entities/user-with-password.entity';

const select = {
	id: true,
	email: true,
	role: true,
	createdAt: true,
	updatedAt: true,
};

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	findAll(getUsersInput: GetUsersInput): Promise<User[]> {
		const { skip, cursor, take, orderBy, where } = getUsersInput;

		return this.prisma.user.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
			select,
		});
	}

	findOne(getUserInput: GetUserInput): Promise<User | null> {
		const { id, email } = getUserInput;

		return this.prisma.user.findUnique({
			where: { id, email },
			select,
		});
	}

	_findOne(getUserInput: GetUserInput): Promise<UserWithPassword> | Promise<null> {
		const { id, email } = getUserInput;

		return this.prisma.user.findUnique({
			where: { id, email },
			select: { ...select, password: true },
		});
	}

	create(createUserInput: CreateUserInput): Promise<User> {
		const { email, password } = createUserInput;
		const emailLowerCase = email.toLowerCase();
		const encodedPassword = encodePassword(password);

		return this.prisma.user.create({
			data: {
				email: emailLowerCase,
				password: encodedPassword,
			},
			select,
		});
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
