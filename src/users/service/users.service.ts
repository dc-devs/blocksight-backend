import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	async create(data: Prisma.UserCreateInput): Promise<User> {
		const { email, password } = data;
		const emailLowerCase = email.toLowerCase();

		return this.prisma.user.create({
			data: {
				email: emailLowerCase,
				password,
			},
		});
	}

	async findOne(
		userWhereUniqueInput: Prisma.UserWhereUniqueInput
	): Promise<User | null> {
		return await this.prisma.user.findUnique({
			where: userWhereUniqueInput,
		});
	}

	async findAll(query?: any): Promise<User[]> {
		let results;

		if (query) {
			// TODO: Handle with Pipes?
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
