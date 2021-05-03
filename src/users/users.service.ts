import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async create(data: Prisma.UserCreateInput): Promise<User> {
		return this.prisma.user.create({
			data,
		});
	}

	async findOne(id: number): Promise<User | null> {
		return await this.prisma.user.findUnique({
			where: {
				id,
			},
		});
	}

	async findAll(query?: any): Promise<User[]> {
		let results;

		if (query) {
			query.id = query.id && Number(query.id);

			results = await this.prisma.user.findMany({
				where: query,
			});
		} else {
			results = await this.prisma.user.findMany({
				where: query,
			});
		}

		return results;
	}

	// update(id: number, updateUserDto: UpdateUserDto) {
	// 	return `This action updates a #${id} user`;
	// }
	async update(id: number) {
		return `This action updates a #${id} user`;
	}

	async remove(id: number) {
		return `This action removes a #${id} user`;
	}
}
