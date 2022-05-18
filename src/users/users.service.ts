import { User } from './models/user.model';
import { Injectable } from '@nestjs/common';
import { encodePassword } from './utils/bcrypt';
import { FindAllUsersInput } from './dto/find-all-users.input';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserInput } from './dto/update-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { FindOneUserInput } from './dto/find-one-user.input';
import { UserWithPassword } from './models/user-with-password.model';

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

	findOne(findOneUserInput: FindOneUserInput): Promise<User | null> {
		const { id, email } = findOneUserInput;

		return this.prisma.user.findUnique({
			where: { id, email },
			select,
		});
	}

	_findOne(findOneUserInput: FindOneUserInput): Promise<UserWithPassword | null> {
		const { id, email } = findOneUserInput;

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
