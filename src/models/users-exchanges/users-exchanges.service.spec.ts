import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersExchangesService } from './users-exchanges.service';
import { UsersExchangesResolver } from './users-exchanges.resolver';
import { FiatTransfersService } from '../fiat-transfers/fiat-transfers.service';
import { ExchangeClientService } from '../../services/exchange-client/exchange-client.service';

describe('UsersExchangesService', () => {
	let service: UsersExchangesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				PrismaService,
				FiatTransfersService,
				UsersExchangesService,
				UsersExchangesResolver,
				ExchangeClientService,
			],
		}).compile();

		service = module.get<UsersExchangesService>(UsersExchangesService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
