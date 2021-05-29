import { Test, TestingModule } from '@nestjs/testing';
import { TokenDataService } from './token-data.service';

describe('TokenDataService', () => {
	let service: TokenDataService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [TokenDataService],
		}).compile();

		service = module.get<TokenDataService>(TokenDataService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
