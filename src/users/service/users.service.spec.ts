import { to } from 'await-to-js';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('UsersService', () => {
	let service: UsersService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [UsersService, PrismaService],
		}).compile();

		service = module.get<UsersService>(UsersService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('findAll', () => {
		it('should be function', () => {
			expect(typeof service.findAll).toBe('function');
		});

		describe('when passed no query params', () => {
			it('should return all of the users', async () => {
				const [error, results] = await to(service.findAll());

				expect(error).toBe(null);
				expect(results.length).toBe(3);
			});
		});

		describe('when passed a query', () => {
			describe('and the query param is for a unique attirbute', () => {
				describe("and the query param contains 'id'", () => {
					it('should return the expected user', async () => {
						const [error, results] = await to(
							service.findAll({ id: 1 })
						);

						const result = results[0];

						expect(error).toBe(null);
						expect(results.length).toBe(1);
						expect(result.id).toBe(1);
					});
				});

				describe("and the query param contains 'email'", () => {
					it('should return the expected user', async () => {
						const [error, results] = await to(
							service.findAll({ email: 'alice@prisma.io' })
						);

						const result = results[0];

						expect(error).toBe(null);
						expect(results.length).toBe(1);
						expect(result.email).toBe('alice@prisma.io');
					});
				});
			});

			describe('and the query param is not for a unique attirbute', () => {
				describe("and the query param contains 'role'", () => {
					it('should return the expected set of users', async () => {
						const [error, results] = await to(
							service.findAll({ role: 'USER' })
						);

						const result = results[0];

						expect(error).toBe(null);
						expect(results.length).toBe(3);
						expect(result.email).toBe('alice@prisma.io');
					});
				});
			});
		});
	});

	describe('findOne', () => {
		it('should be function', () => {
			expect(typeof service.findOne).toBe('function');
		});

		describe("when passed an 'id'", () => {
			it('should return the expected user', async () => {
				const id = 1;
				const [error, result] = await to(service.findOne(id));

				expect(error).toBe(null);
				expect(result.id).toBe(1);
			});
		});
	});

	describe('create', () => {
		it('should be function', () => {
			expect(typeof service.create).toBe('function');
		});

		describe('when passed all required data to create a new user', () => {
			it('should create and return a new user', async () => {
				const userCreateInput = {
					email: 'david.w.christian@gmail.com',
					password: '12345678',
				};
				const [error, newUser] = await to(
					service.create(userCreateInput)
				);
				expect(error).toBe(null);

				expect(newUser.email).toBe('david.w.christian@gmail.com');
				expect(newUser.password).toBe('12345678');
				expect(newUser.firstName).toBe(null);
				expect(newUser.lastName).toBe(null);
				expect(newUser.role).toBe('USER');
			});
		});

		describe('when missing required data to create a new user', () => {
			describe('and is missing all the required data', () => {
				it('should throw an error', async () => {
					const userCreateInput = {
						email: null,
						password: null,
					};
					const [error, newUser] = await to(
						service.create(userCreateInput)
					);

					expect(error).not.toBeNull();
				});
			});

			describe('and is missing the email field', () => {
				it('should throw an error', async () => {
					const userCreateInput = {
						email: null,
						password: '12345678',
					};
					const [error, newUser] = await to(
						service.create(userCreateInput)
					);

					expect(error[0]).not.toBeNull();
				});
			});

			describe('and is missing the password field', () => {
				it('should throw an error', async () => {
					const userCreateInput = {
						email: 'david.w.christian@gmail.com',
						password: null,
					};
					const [error, newUser] = await to(
						service.create(userCreateInput)
					);

					expect(error).not.toBeNull();
				});
			});
		});

		describe('when tries to create a new user and a unique attirribute has already been used', () => {
			it('should return an error', async () => {
				const userCreateInput = {
					email: 'david.w.christian@gmail.com',
					password: '12345678',
				};
				const [error, newUser] = await to(
					service.create(userCreateInput)
				);

				console.log(error);
				expect(error).toBe(null);
			});
		});
	});
});
