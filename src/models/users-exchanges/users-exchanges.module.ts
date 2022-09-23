import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersExchangesService } from './users-exchanges.service';
import { UsersExchangesResolver } from './users-exchanges.resolver';
import { FiatTransfersService } from '../fiat-transfers/fiat-transfers.service';
import { ExchangeClientService } from '../../services/exchange-client/exchange-client.service';

@Module({
	providers: [
		PrismaService,
		FiatTransfersService,
		UsersExchangesService,
		UsersExchangesResolver,
		ExchangeClientService,
	],
	exports: [UsersExchangesService],
})
export class UsersExchangesModule {}
