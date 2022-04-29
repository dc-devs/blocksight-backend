import { Test, TestingModule } from '@nestjs/testing';
import { GusersResolver } from './gusers.resolver';
import { GusersService } from './gusers.service';

describe('GusersResolver', () => {
	let resolver: GusersResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [GusersResolver, GusersService],
		}).compile();

		resolver = module.get<GusersResolver>(GusersResolver);
	});

	it('should be defined', () => {
		expect(resolver).toBeDefined();
	});
});
