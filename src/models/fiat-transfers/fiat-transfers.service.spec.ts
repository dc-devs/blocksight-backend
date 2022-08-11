import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { FiatTransfersService } from './fiat-transfers.service';

describe('FiatTransfersService', () => {
	let service: FiatTransfersService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [FiatTransfersService, PrismaService],
		}).compile();

		service = module.get<FiatTransfersService>(FiatTransfersService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
