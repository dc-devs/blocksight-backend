import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { FiatTransfersService } from './fiat-transfers.service';
import { FiatTransfersResolver } from './fiat-transfers.resolver';
import { ExchangeClientService } from '../../services/exchange-client/exchange-client.service';

describe('FiatTransfersService', () => {
	let service: FiatTransfersService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PrismaService,
				FiatTransfersService,
				FiatTransfersResolver,
				ExchangeClientService,
			],
		}).compile();

		service = module.get<FiatTransfersService>(FiatTransfersService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
