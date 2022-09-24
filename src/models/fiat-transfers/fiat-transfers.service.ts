import { Prisma } from 'prisma';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FiatTransfer } from './dto/models/fiat-transfer.model';
import { UsersExchanges } from '../users-exchanges/dto/models/users-exchanges.model';
import { ExchangeClientService } from '../../services/exchange-client/exchange-client.service';
import {
	UpdateFiatTransferInput,
	CreateFiatTransferInput,
	FindOneFiatTransferInput,
	FindAllFiatTransfersInput,
} from './dto/inputs';

interface SyncFiatTransfersDataProps {
	userId: number;
}

interface DedupedUsersExchanges {
	[key: number]: UsersExchanges;
}

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

	async syncFiatTransfersData({ userId }: SyncFiatTransfersDataProps) {
		let dedupedUsersExchanges: DedupedUsersExchanges = {};

		// Get Users Exchanges
		const usersExchanges = await this.prisma.usersExchanges.findMany({
			where: {
				userId,
			},
			select: {
				id: true,
				exchange: true,
				userId: true,
				exchangeId: true,
				apiKey: true,
				apiSecret: true,
				apiPassphrase: true,
				apiNickname: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		usersExchanges.forEach((usersExchange) => {
			if (!dedupedUsersExchanges[usersExchange.exchangeId]) {
				dedupedUsersExchanges[usersExchange.exchangeId] = usersExchange;
			}
		});

		console.log('------------');
		console.log('[TEST LOG]:: syncFiatTransfersData', userId);

		// For each exchange get the correct Exchange service to pull data from exchnage
		const dedupedUsersExchangesArray = Object.keys(dedupedUsersExchanges);

		for (let i = 0; i < dedupedUsersExchangesArray.length; i++) {
			const dedupedUsersExchangesKey = dedupedUsersExchangesArray[i];
			const usersExchange = usersExchanges[dedupedUsersExchangesKey];

			if (usersExchange) {
				console.log(usersExchange.exchangeId);

				const { exchangeId, apiKey, apiSecret, apiPassphrase } =
					usersExchange;

				const exchangeClient =
					await this.exchangeClientService.getExchangeClient({
						exchangeId,
						apiKey,
						apiSecret,
						apiPassphrase,
					});

				const allFiatTransfers =
					await exchangeClient.getAllFiatTansfers();

				await this.prisma.fiatTransfer.createMany({
					data: allFiatTransfers as unknown as any[],
				});
			}
		}

		console.log('------------');

		// Since Hard Sync
		// --------------------
		// Delete all previous data from fiatExchnages

		// Save that data to fiatExchanges
	}
}
