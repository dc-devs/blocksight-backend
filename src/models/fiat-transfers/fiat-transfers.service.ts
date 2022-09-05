import { Injectable } from '@nestjs/common';
import { FiatTransfer } from './dto/models/fiat-transfer.model';
import { PrismaService } from '../../prisma/prisma.service';
import {
	UpdateFiatTransferInput,
	CreateFiatTransferInput,
	FindOneFiatTransferInput,
	FindAllFiatTransfersInput,
} from './dto/inputs';

const select = {
	id: true,
	exchange: true,
	type: true,
	amount: true,
	currency: true,
	timestamp: true,
	transferData: true,
	exchangeId: true,
	createdAt: true,
	updatedAt: true,
};

@Injectable()
export class FiatTransfersService {
	constructor(private prisma: PrismaService) {}

	findAll(
		findAllFiatTransfersInput: FindAllFiatTransfersInput,
	): Promise<FiatTransfer[]> {
		const { skip, cursor, take, orderBy, where } =
			findAllFiatTransfersInput;
		return this.prisma.fiatTransfer.findMany({
			skip,
			take,
			cursor,
			where,
			orderBy,
			select,
		});
	}

	async findOne(
		findOneFiatTransferInput: FindOneFiatTransferInput,
	): Promise<FiatTransfer | null> {
		const { id } = findOneFiatTransferInput;

		return this.prisma.fiatTransfer.findUnique({
			where: { id },
			select,
		});
	}

	create(
		createFiatTransferInput: CreateFiatTransferInput,
	): Promise<FiatTransfer> {
		const data = createFiatTransferInput;
		const { type, amount, currency, timestamp, transferData, exchangeId } =
			data;

		return this.prisma.fiatTransfer.create({
			data: {
				type,
				amount,
				currency,
				timestamp,
				transferData,
				exchange: { connect: { id: exchangeId } },
			},
			select,
		});
	}

	update(id: number, data: UpdateFiatTransferInput): Promise<FiatTransfer> {
		return this.prisma.fiatTransfer.update({
			where: {
				id,
			},
			data,
			select,
		});
	}

	delete(id: number): Promise<FiatTransfer> {
		return this.prisma.fiatTransfer.delete({
			where: {
				id,
			},
			select,
		});
	}
}
