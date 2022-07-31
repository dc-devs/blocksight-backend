import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { Exchange } from './dto/models/exchange.model';
import { PrismaService } from '../../prisma/prisma.service';
import {
	UpdateExchangeInput,
	CreateExchangeInput,
	FindOneExchangeInput,
	FindAllExchangesInput,
} from './dto/inputs';

const select = {
	id: true,
	name: true,
	websiteUrl: true,
	logoUrl: true,
	companyLogoUrl: true,
	hasApi: true,
	hasCsv: true,
	users: {
		include: {
			user: true,
		},
	},
	createdAt: true,
	updatedAt: true,
};

@Injectable()
export class ExchangesService {
	constructor(private prisma: PrismaService) {}

	findAll(findAllExchangesInput: FindAllExchangesInput): Promise<Exchange[]> {
		const { skip, cursor, take, orderBy, where } = findAllExchangesInput;
		return this.prisma.exchange.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
			select,
		});
	}

	async findOne(
		findOneExchangeInput: FindOneExchangeInput,
	): Promise<Exchange | null> {
		const { id, name } = findOneExchangeInput;

		return this.prisma.exchange.findUnique({
			where: { id, name },
			select,
		});
	}

	create(createExchangeInput: CreateExchangeInput): Promise<Exchange> {
		const data = createExchangeInput as Prisma.ExchangeCreateInput;

		return this.prisma.exchange.create({
			data,
			select,
		});
	}

	update(id: number, data: UpdateExchangeInput): Promise<Exchange> {
		return this.prisma.exchange.update({
			where: {
				id,
			},
			data,
			select,
		});
	}

	delete(id: number): Promise<Exchange> {
		return this.prisma.exchange.delete({
			where: {
				id,
			},
			select,
		});
	}
}
