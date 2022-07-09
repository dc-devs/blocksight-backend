import { Test, TestingModule } from '@nestjs/testing';
import { ExchangesService } from './exchanges.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('ExchangesService', () => {
	let service: ExchangesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ExchangesService, PrismaService],
		}).compile();

		service = module.get<ExchangesService>(ExchangesService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
