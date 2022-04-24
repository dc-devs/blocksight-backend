import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { UpdateUserInput } from '../dto/update-user.input';
import { CreateUserInput } from '../dto/create-user.input';
import { PrismaService } from '../../prisma/prisma.service';

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

	async findAll(params: {
		skip?: number;
		take?: number;
		cursor?: Prisma.UserWhereUniqueInput;
		where?: string;
		orderBy?: Prisma.UserOrderByWithRelationInput;
	}): Promise<Partial<User>[]> {
		const { skip, take, where, orderBy } = params;
		const whereClause = where && JSON.parse(where);

		return this.prisma.user.findMany({
			skip,
			take,
			where: whereClause,
			orderBy,
			select,
		});
	}

	async findOne(id: number): Promise<Partial<User> | null> {
		return await this.prisma.user.findUnique({
			where: {
				id,
			},
			select,
		});
	}

	async create(data: CreateUserInput): Promise<Partial<User>> {
		const { email, password } = data;
		const emailLowerCase = email.toLowerCase();

		return this.prisma.user.create({
			data: {
				email: emailLowerCase,
				password,
			},
			select,
		});
	}

	async update(
		id: number,
		updateUserInput: UpdateUserInput
	): Promise<Partial<User>> {
		return await this.prisma.user.update({
			where: {
				id,
			},
			data: updateUserInput as Prisma.UserUpdateInput,
			select,
		});
	}

	async delete(id: number): Promise<Partial<User>> {
		return await this.prisma.user.delete({
			where: {
				id,
			},
			select
		});
	}
}
