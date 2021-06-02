import { Test, TestingModule } from '@nestjs/testing';
import { TokenBalancesController } from './token-balances.controller';
import { TokenBalancesService } from './token-balances.service';

describe('TokenBalancesController', () => {
	let controller: TokenBalancesController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [TokenBalancesController],
			providers: [TokenBalancesService],
		}).compile();

		controller = module.get<TokenBalancesController>(
			TokenBalancesController
		);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
