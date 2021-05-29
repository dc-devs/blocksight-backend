import { Test, TestingModule } from '@nestjs/testing';
import { TokenDataController } from './token-data.controller';
import { TokenDataService } from './token-data.service';

describe('TokenDataController', () => {
	let controller: TokenDataController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [TokenDataController],
			providers: [TokenDataService],
		}).compile();

		controller = module.get<TokenDataController>(TokenDataController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
