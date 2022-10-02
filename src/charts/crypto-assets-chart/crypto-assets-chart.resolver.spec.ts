import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { CryptoAssetsChartService } from './crypto-assets-chart.service';
import { CryptoAssetsChartResolver } from './crypto-assets-chart.resolver';
import { FiatTransfersService } from '../../models/fiat-transfers/fiat-transfers.service';
import { ExchangeClientService } from '../../services/exchange-client/exchange-client.service';

describe('CryptoAssetsChartResolver', () => {
	let resolver: CryptoAssetsChartResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PrismaService,
				FiatTransfersService,
				ExchangeClientService,
				CryptoAssetsChartService,
				CryptoAssetsChartResolver,
			],
		}).compile();

		resolver = module.get<CryptoAssetsChartResolver>(
			CryptoAssetsChartResolver,
		);
	});

	it('should be defined', () => {
		expect(resolver).toBeDefined();
	});
});
