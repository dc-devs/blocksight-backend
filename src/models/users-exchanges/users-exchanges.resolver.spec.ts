import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersExchangesService } from './users-exchanges.service';
import { UsersExchangesResolver } from './users-exchanges.resolver';

describe('UsersExchangesResolver', () => {
	let resolver: UsersExchangesResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UsersExchangesResolver, UsersExchangesService, PrismaService],
		}).compile();

		resolver = module.get<UsersExchangesResolver>(UsersExchangesResolver);
	});

	it('should be defined', () => {
		expect(resolver).toBeDefined();
	});
});
