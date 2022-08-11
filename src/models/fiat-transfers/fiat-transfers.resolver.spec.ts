import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { FiatTransfersService } from './fiat-transfers.service';
import { FiatTransfersResolver } from './fiat-transfers.resolver';

describe('FiatTransfersResolver', () => {
	let resolver: FiatTransfersResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				FiatTransfersResolver,
				FiatTransfersService,
				PrismaService,
			],
		}).compile();

		resolver = module.get<FiatTransfersResolver>(FiatTransfersResolver);
	});

	it('should be defined', () => {
		expect(resolver).toBeDefined();
	});
});
