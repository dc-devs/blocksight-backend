import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { UsersExchanges } from './dto/models/usersExchanges.model';
import { PrismaService } from '../../prisma/prisma.service';
import {
	UpdateUsersExchangesInput,
	CreateUsersExchangesInput,
	FindOneUsersExchangesInput,
	FindAllUsersExchangesInput,
} from './dto/inputs';

const select = {"user":true,"userId":true,"exchange":true,"exchangeId":true,"createdAt":true,"updatedAt":true};

@Injectable()
export class UsersExchangesService {
	constructor(private prisma: PrismaService) {}

	findAll(findAllUsersExchangesInput: FindAllUsersExchangesInput): Promise<UsersExchanges[]> {
		const { skip, cursor, take, orderBy, where } = findAllUsersExchangesInput;
		return this.prisma.usersExchanges.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
			select,
		});
	}

	async findOne(
		findOneUsersExchangesInput: FindOneUsersExchangesInput,
	): Promise<UsersExchanges | null> {
		const { id, name } = findOneUsersExchangesInput;

		return this.prisma.usersExchanges.findUnique({
			where: { id, name },
			select,
		});
	}

	create(createUsersExchangesInput: CreateUsersExchangesInput): Promise<UsersExchanges> {
		const data = createUsersExchangesInput as Prisma.UsersExchangesCreateInput;

		return this.prisma.usersExchanges.create({
			data,
			select,
		});
	}

	update(id: number, data: UpdateUsersExchangesInput): Promise<UsersExchanges> {
		return this.prisma.usersExchanges.update({
			where: {
				id,
			},
			data,
			select,
		});
	}

	delete(id: number): Promise<UsersExchanges> {
		return this.prisma.usersExchanges.delete({
			where: {
				id,
			},
			select,
		});
	}
}
