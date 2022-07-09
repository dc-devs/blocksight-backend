import { Test, TestingModule } from '@nestjs/testing';
import { ExchangesService } from './exchanges.service';
import { ExchangesResolver } from './exchanges.resolver';
import { PrismaService } from '../../prisma/prisma.service';

describe('ExchangesResolver', () => {
	let resolver: ExchangesResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ExchangesResolver, ExchangesService, PrismaService],
		}).compile();

		resolver = module.get<ExchangesResolver>(ExchangesResolver);
	});

	it('should be defined', () => {
		expect(resolver).toBeDefined();
	});
});
