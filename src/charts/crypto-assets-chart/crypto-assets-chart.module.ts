import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CryptoAssetsChartService } from './crypto-assets-chart.service';
import { CryptoAssetsChartResolver } from './crypto-assets-chart.resolver';
import { FiatTransfersService } from '../../models/fiat-transfers/fiat-transfers.service';
import { ExchangeClientService } from '../../services/exchange-client/exchange-client.service';

@Module({
	providers: [
		PrismaService,
		FiatTransfersService,
		ExchangeClientService,
		CryptoAssetsChartService,
		CryptoAssetsChartResolver,
	],
	exports: [CryptoAssetsChartService],
})
export class CryptoAssetsChartModule {}
