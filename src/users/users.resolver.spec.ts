import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersResolver', () => {
	let resolver: UsersResolver;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UsersResolver, UsersService, PrismaService],
		}).compile();

		resolver = module.get<UsersResolver>(UsersResolver);
	});

	it('should be defined', () => {
		expect(resolver).toBeDefined();
	});
});
