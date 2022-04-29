import { Test, TestingModule } from '@nestjs/testing';
import { GusersService } from './gusers.service';

describe('GusersService', () => {
	let service: GusersService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [GusersService],
		}).compile();

		service = module.get<GusersService>(GusersService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
