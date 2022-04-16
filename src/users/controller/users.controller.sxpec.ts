import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../service/users.service';
import { PrismaService } from '../../prisma/prisma.service';
import { User, Prisma } from '@prisma/client';

describe('UsersController', () => {
	let usersService: UsersService;
	let usersController: UsersController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [UsersService, PrismaService],
		}).compile();

		usersService = module.get<UsersService>(UsersService);
		usersController = module.get<UsersController>(UsersController);
	});

	it('should be defined', () => {
		expect(usersController).toBeDefined();
	});

	// describe('findAll', () => {
	// 	it('should return an array of users', async () => {
	// 		// const mockUser: User = {
	// 		// 	id: 1,
	// 		// 	email: 'test@gmail.com',
	// 		// 	firstName: 'Bob',
	// 		// 	lastName: 'McTesterson',
	// 		// 	password: 'test',
	// 		// 	role: UserRole.USER,
	// 		// 	createdAt: '2022-05-01 17:39:49.554808-05',
	// 		// 	updatedAt: '2022-05-01 17:39:49.554808-05',
	// 		// };

	// 		// const users = [mockUser];

	// 		// jest.spyOn(usersService, 'findAll').mockImplementation(({}) => {
	// 		// 	return new Promise((resolve, reject) => {
	// 		// 		resolve(users);
	// 		// 	});
	// 		// });

	// 		// expect(await usersController.findAll({})).toBe(users);
	// 		expect(true).toBeTruthy();
	// 	});
	// });
});
