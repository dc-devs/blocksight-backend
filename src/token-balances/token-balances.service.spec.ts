import { Test, TestingModule } from '@nestjs/testing';
import { TokenBalancesService } from './token-balances.service';

describe('TokenBalancesService', () => {
	let service: TokenBalancesService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [TokenBalancesService],
		}).compile();

		service = module.get<TokenBalancesService>(TokenBalancesService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
