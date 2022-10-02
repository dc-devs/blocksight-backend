import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { CryptoAssetsChartService } from './crypto-assets-chart.service';
import { CryptoAssetsChartResolver } from './crypto-assets-chart.resolver';
import { FiatTransfersService } from '../../models/fiat-transfers/fiat-transfers.service';
import { ExchangeClientService } from '../../services/exchange-client/exchange-client.service';

describe('CryptoAssetsChartService', () => {
	let service: CryptoAssetsChartService;

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

		service = module.get<CryptoAssetsChartService>(
			CryptoAssetsChartService,
		);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
