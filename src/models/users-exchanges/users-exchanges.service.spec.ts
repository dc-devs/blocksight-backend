import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { UsersExchangesService } from './users-exchanges.service';

describe('UsersExchangesService', () => {
	let service: UsersExchangesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UsersExchangesService, PrismaService],
		}).compile();

		service = module.get<UsersExchangesService>(UsersExchangesService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
