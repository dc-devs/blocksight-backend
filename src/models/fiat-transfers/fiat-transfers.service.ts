import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FiatTransfer } from './dto/models/fiat-transfer.model';
import { getUsersExchangesByUserId } from '../users-exchanges/utils';
import getFiatTransfersTotals from './utils/get-fiat-transfers-totals';
import { FiatTransfersTotals } from './dto/models/fiat-transfers-totals.model';
import { ExchangeClientService } from '../../services/exchange-client/exchange-client.service';
import {
	UpdateFiatTransferInput,
	CreateFiatTransferInput,
	FindOneFiatTransferInput,
	FindAllFiatTransfersInput,
} from './dto/inputs';

interface ISyncFiatTransfersDataOptions {
	userId: number;
}

interface IGetFiatTransferTotalsOptions {
	userId: number;
}

interface IDeleteUsingUserExchange {
	userId: number;
	exchangeId: number;
}

const select = {
	id: true,
	exchange: true,
	user: true,
	type: true,
	amount: true,
	currency: true,
	timestamp: true,
	transferData: true,
	exchangeId: true,
	userId: true,
	createdAt: true,
	updatedAt: true,
};

@Injectable()
export class FiatTransfersService {
	constructor(
		private prisma: PrismaService,
		private exchangeClientService: ExchangeClientService,
	) {}

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
		const {
			type,
			amount,
			currency,
			timestamp,
			transferData,
			exchangeId,
			userId,
		} = data;

		return this.prisma.fiatTransfer.create({
			data: {
				type,
				amount,
				currency,
				timestamp,
				transferData,
				exchange: { connect: { id: exchangeId } },
				user: { connect: { id: userId } },
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

	deleteManyUsingUserExchange({
		userId,
		exchangeId,
	}: IDeleteUsingUserExchange): Promise<any> {
		return this.prisma.fiatTransfer.deleteMany({
			where: {
				userId,
				exchangeId,
			},
		});
	}

	async getFiatTransfersTotals({
		userId,
	}: IGetFiatTransferTotalsOptions): Promise<FiatTransfersTotals> {
		const fiatTransfers = await this.prisma.fiatTransfer.findMany({
			where: {
				userId,
			},
			select,
		});

		const fiatTransferTotals = getFiatTransfersTotals({ fiatTransfers });

		return fiatTransferTotals;
	}

	// TODO: Can make Promise.all to avoid waiting
	async hardSyncAllFiatTransfersData({
		userId,
	}: ISyncFiatTransfersDataOptions) {
		const usersExchanges = await getUsersExchangesByUserId({
			userId,
			prisma: this.prisma,
		});

		for (let i = 0; i < usersExchanges.length; i++) {
			const usersExchange = usersExchanges[i];
			console.log('hardSyncAllFiatTransfersData', usersExchange);

			if (usersExchange) {
				const { exchangeId, apiKey, apiSecret, apiPassphrase } =
					usersExchange;

				const exchangeClient =
					await this.exchangeClientService.getExchangeClient({
						userId,
						apiKey,
						apiSecret,
						exchangeId,
						apiPassphrase,
					});

				if (exchangeClient) {
					const allFiatTransfers =
						await exchangeClient.getAllFiatTansfers();

					await this.prisma.fiatTransfer.deleteMany({
						where: {
							userId,
							exchangeId,
						},
					});

					await this.prisma.fiatTransfer.createMany({
						data: allFiatTransfers as unknown as any[],
					});
				}
			}
		}
	}
}
