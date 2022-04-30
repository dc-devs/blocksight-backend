import { Injectable } from '@nestjs/common';
import { CreateGuserInput } from './dto/create-guser.input';
import { UpdateGuserInput } from './dto/update-guser.input';
import { Guser } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { GetUsersArgs } from './dto/get-gusers.args';

const select = {
	id: true,
	email: true,
	role: true,
	createdAt: true,
	updatedAt: true,
};

@Injectable()
export class GusersService {
	constructor(private prisma: PrismaService) {}

	async findAll(args: GetUsersArgs): Promise<Partial<Guser>[]> {
		const { skip, cursor, take, orderBy, where } = args;

		return this.prisma.guser.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
			select,
		});
	}

	findOne(id: number) {
		return `This action returns a #${id} guser`;
	}

	create(createGuserInput: CreateGuserInput) {
		return 'This action adds a new guser';
	}

	update(id: number, updateGuserInput: UpdateGuserInput) {
		return `This action updates a #${id} guser`;
	}

	remove(id: number) {
		return `This action removes a #${id} guser`;
	}
}
