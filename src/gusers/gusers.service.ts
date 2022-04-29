import { Injectable } from '@nestjs/common';
import { CreateGuserInput } from './dto/create-guser.input';
import { UpdateGuserInput } from './dto/update-guser.input';
import { Guser, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

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

	create(createGuserInput: CreateGuserInput) {
		return 'This action adds a new guser';
	}

	async findAll(params: {
		skip?: number;
		take?: number;
		cursor?: Prisma.GuserWhereUniqueInput;
		where?: string;
		orderBy?: Prisma.GuserOrderByWithRelationInput;
	}): Promise<Partial<Guser>[]> {
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

	findOne(id: number) {
		return `This action returns a #${id} guser`;
	}

	update(id: number, updateGuserInput: UpdateGuserInput) {
		return `This action updates a #${id} guser`;
	}

	remove(id: number) {
		return `This action removes a #${id} guser`;
	}
}
