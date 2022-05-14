import { User } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { GetUserInput } from './dto/get-user.input';
import { GetUsersInput } from './dto/get-users.input';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserInput } from './dto/create-user.input';

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

	findAll(getUsersInput: GetUsersInput): Promise<Partial<User>[]> {
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

	findOne(getUserInput: GetUserInput): Promise<Partial<User> | null> {
		const { id, email } = getUserInput;

		return this.prisma.user.findUnique({
			where: { id, email },
			select,
		});
	}

	create(createUserInput: CreateUserInput): Promise<Partial<User>> {
		const { email, password } = createUserInput;
		const emailLowerCase = email.toLowerCase();

		return this.prisma.user.create({
			data: {
				email: emailLowerCase,
				password,
			},
			select,
		});
	}

	update(id: number, data: UpdateUserInput): Promise<Partial<User>> {
		return this.prisma.user.update({
			where: {
				id,
			},
			data,
			select,
		});
	}

	delete(id: number): Promise<Partial<User>> {
		return this.prisma.user.delete({
			where: {
				id,
			},
			select,
		});
	}
}
