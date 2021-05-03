import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';

describe('UsersController', () => {
	let controller: UsersController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [UsersService, PrismaService],
		}).compile();

		controller = module.get<UsersController>(UsersController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('create', () => {
		it('should be a function', () => {
			expect(typeof controller.create).toBe('function');
		});
	});
});
