import { Injectable } from '@nestjs/common';
import SecretBox from '../../utils/secret-box';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersExchanges } from './dto/models/users-exchanges.model';
import { FiatTransfersService } from '../../models/fiat-transfers/fiat-transfers.service';
import {
	UpdateUsersExchangesInput,
	CreateUsersExchangesInput,
	FindOneUsersExchangesInput,
	FindAllUsersExchangesInput,
} from './dto/inputs';

const select = {
	id: true,
	user: true,
	exchange: true,
	userId: true,
	exchangeId: true,
	apiKey: true,
	apiSecret: true,
	apiPassphrase: true,
	apiNickname: true,
	createdAt: true,
	updatedAt: true,
};

@Injectable()
export class UsersExchangesService {
	constructor(
		private prisma: PrismaService,
		private fiatTransfersService: FiatTransfersService,
	) {}

	findAll(
		findAllUsersExchangesInput: FindAllUsersExchangesInput,
	): Promise<UsersExchanges[]> {
		const { skip, cursor, take, orderBy, where } =
			findAllUsersExchangesInput;
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
		const { id } = findOneUsersExchangesInput;

		return this.prisma.usersExchanges.findUnique({
			where: { id },
			select,
		});
	}

	async create(
		createUsersExchangesInput: CreateUsersExchangesInput,
	): Promise<UsersExchanges> {
		const secretbox = new SecretBox();
		const data = createUsersExchangesInput;

		const {
			apiKey,
			userId,
			apiSecret,
			exchangeId,
			apiNickname,
			apiPassphrase,
		} = data;

		const encryptedApiKey = await secretbox.encrypt(apiKey);
		const encryptedApiSecret = await secretbox.encrypt(apiSecret);
		const encryptedApiPassphrase = await secretbox.encrypt(apiPassphrase);

		const userExchange = this.prisma.usersExchanges.create({
			data: {
				userId,
				exchangeId,
				apiNickname,
				apiKey: encryptedApiKey,
				apiSecret: encryptedApiSecret,
				apiPassphrase: encryptedApiPassphrase,
			},
			select,
		});

		// TODO: Make this a background job in near future
		await this.fiatTransfersService.syncFiatTransfersData({ userId });

		return userExchange;
	}

	update(
		id: number,
		data: UpdateUsersExchangesInput,
	): Promise<UsersExchanges> {
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
