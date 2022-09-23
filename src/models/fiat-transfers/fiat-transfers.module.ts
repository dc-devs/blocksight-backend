import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FiatTransfersService } from './fiat-transfers.service';
import { FiatTransfersResolver } from './fiat-transfers.resolver';
import { ExchangeClientService } from '../../services/exchange-client/exchange-client.service';

@Module({
	providers: [
		PrismaService,
		FiatTransfersService,
		FiatTransfersResolver,
		ExchangeClientService,
	],
	exports: [FiatTransfersService],
})
export class FiatTransfersModule {}
