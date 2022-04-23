import { User, Prisma } from '@prisma/client';
import * as request from 'supertest';
import initializeTestApp from './init/initializeTestApp';
import { CreateUserInput } from '../src/users/dto/create-user.input';
import { INestApplication, HttpStatus } from '@nestjs/common';
import expectedUserObject from './helpers/expectedModelObjects/expectedUserObject';

const enum Validation {
	EMAIL_IS_EMAIL = 'email must be an email',
	PASSWORD_IS_STRING = 'password must be a string',
	PASSWORD_MIN_LENGTH = 'password must be longer than or equal to 8 characters',
}

const enum UserProperties {
	PASSWORD = 'password',
}

describe('Users', () => {
	let app: INestApplication;

	beforeAll(async () => {
		app = await initializeTestApp();
	});

	afterAll(async () => {
		await app.close();
	});

	describe('Get all [Get /]', () => {
		describe('when route requested with no query parameters', () => {
			it('should return all users', async () => {
				const response = await request(app.getHttpServer()).get(
					'/users'
				);

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(response.body).toHaveLength(55);

				response.body.forEach((user) => {
					expect(user).toEqual(expectedUserObject);
					expect(user).not.toHaveProperty(UserProperties.PASSWORD);
				});
			});
		});

		describe('when route requested with query parameters', () => {
			describe('and the where param contains aims to fetch users with role equal to', () => {
				it('should return all users with that email', async () => {
					const role = 'USER';
					const response = await request(app.getHttpServer()).get(
						`/users?where={"role":{"equals":"${role}"}}`
					);

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(response.body).toHaveLength(53);

					response.body.forEach((user) => {
						expect(user).toEqual(expectedUserObject);
						expect(user.role).toEqual(role);
					});
				});
			});
			describe('and the skip and take params are used to implement pagination', () => {
				describe('and the skip param is 0, and the take param is 10', () => {
					it('should return the first 10 users', async () => {
						const skip = 0;
						const take = 10;
						const response = await request(app.getHttpServer()).get(
							`/users?skip=${skip}&take=${take}`
						);

						expect(response.statusCode).toEqual(HttpStatus.OK);
						expect(response.body).toHaveLength(10);

						response.body.forEach((user) => {
							expect(user).toEqual(expectedUserObject);
						});
						
						const lastUser = response.body[response.body.length - 1];
						expect(lastUser.id).toEqual(skip + take);
					});
				});
				describe('and the skip param is 10, and the take param is 10', () => {
					it('should return the first 10 users', async () => {
						const skip = 10;
						const take = 10;
						const response = await request(app.getHttpServer()).get(
							`/users?skip=${skip}&take=${take}`
						);

						expect(response.statusCode).toEqual(HttpStatus.OK);
						expect(response.body).toHaveLength(10);

						response.body.forEach((user) => {
							expect(user).toEqual(expectedUserObject);
						});
						
						const lastUser = response.body[response.body.length - 1];
						expect(lastUser.id).toEqual(skip + take);
					});
				});
			});
		});
	});

	it.todo('Get one [Get /:id]');

	// TODO: Add validation cases where data doesnt exist, and extra data is sent
	describe('Create [Post /]', () => {
		describe('when passed an email and a password', () => {
			let newUser;

			beforeEach(() => {
				newUser = {
					email: 'test-1@gmail.com',
					password: '12345678',
				};
			});

			it('should create a new user', async () => {
				const expectedUserResponse = expect.objectContaining({
					email: 'test-1@gmail.com',
					password: '12345678',
					role: 'USER',
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
				});

				const response = await request(app.getHttpServer())
					.post('/users')
					.send(newUser as CreateUserInput);

				expect(response.statusCode).toEqual(HttpStatus.CREATED);
				expect(response.body).toEqual(expectedUserResponse);
			});
		});

		describe('when passed no data', () => {
			let newUser;

			beforeEach(() => {
				newUser = {};
			});

			it('should return an error', async () => {
				const response = await request(app.getHttpServer())
					.post('/users')
					.send(newUser as CreateUserInput);

				expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
				expect(response.body.message).toEqual([
					Validation.EMAIL_IS_EMAIL,
					Validation.PASSWORD_MIN_LENGTH,
					Validation.PASSWORD_IS_STRING,
				]);
			});
		});

		describe('when passed only email', () => {
			let newUser;

			beforeEach(() => {
				newUser = {
					email: 'david-test-2@gmail.com',
				};
			});

			it('should return an error', async () => {
				const response = await request(app.getHttpServer())
					.post('/users')
					.send(newUser as CreateUserInput);

				expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
				expect(response.body.message).toEqual([
					Validation.PASSWORD_MIN_LENGTH,
					Validation.PASSWORD_IS_STRING,
				]);
			});
		});

		describe('when passed only password', () => {
			let newUser;

			beforeEach(() => {
				newUser = {
					password: '12345678',
				};
			});

			it('should return an error', async () => {
				const response = await request(app.getHttpServer())
					.post('/users')
					.send(newUser as CreateUserInput);

				expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
				expect(response.body.message).toEqual([
					Validation.EMAIL_IS_EMAIL,
				]);
			});
		});
	});

	it.todo('Update one [Patch /:id]');
	it.todo('Delete one [Delete /:id]');

	// it('should be defined', () => {
	// 	expect(service).toBeDefined();
	// });

	// describe('findAll', () => {
	// 	it('should be function', () => {
	// 		expect(typeof service.findAll).toBe('function');
	// 	});

	// 	describe('when passed no query params', () => {
	// 		it('should return all of the users', async () => {
	// 			const [error, results] = await to(service.findAll());

	// 			expect(error).toBe(null);
	// 			expect(results.length).toBe(3);
	// 		});
	// 	});

	// 	describe('when passed a query', () => {
	// 		describe('and the query param is for a unique attirbute', () => {
	// 			describe("and the query param contains 'id'", () => {
	// 				it('should return the expected user', async () => {
	// 					const [error, results] = await to(
	// 						service.findAll({ id: 1 })
	// 					);

	// 					const result = results[0];

	// 					expect(error).toBe(null);
	// 					expect(results.length).toBe(1);
	// 					expect(result.id).toBe(1);
	// 				});
	// 			});

	// 			describe("and the query param contains 'email'", () => {
	// 				it('should return the expected user', async () => {
	// 					const [error, results] = await to(
	// 						service.findAll({ email: 'alice@prisma.io' })
	// 					);

	// 					const result = results[0];

	// 					expect(error).toBe(null);
	// 					expect(results.length).toBe(1);
	// 					expect(result.email).toBe('alice@prisma.io');
	// 				});
	// 			});
	// 		});

	// 		describe('and the query param is not for a unique attirbute', () => {
	// 			describe("and the query param contains 'role'", () => {
	// 				it('should return the expected set of users', async () => {
	// 					const [error, results] = await to(
	// 						service.findAll({ role: 'USER' })
	// 					);

	// 					const result = results[0];

	// 					expect(error).toBe(null);
	// 					expect(results.length).toBe(3);
	// 					expect(result.email).toBe('alice@prisma.io');
	// 				});
	// 			});
	// 		});
	// 	});
	// });

	// fdescribe('findOne', () => {
	// 	it('should be function', () => {
	// 		expect(typeof service.findOne).toBe('function');
	// 	});

	// 	describe("when passed an 'id'", () => {
	// 		it('should return the expected user', async () => {
	// 			const id = 1;
	// 			const [error, result] = await to(service.findOne({ id }));

	// 			expect(error).toBe(null);
	// 			expect(result.id).toBe(1);
	// 		});
	// 	});

	// 	describe("when passed an 'email'", () => {
	// 		it('should return the expected user', async () => {
	// 			const email = 'bob@prisma.io';
	// 			const [error, result] = await to(service.findOne({ email }));
	// 			console.log('[JEST]', result);
	// 			expect(error).toBe(null);
	// 			expect(result.email).toBe(email);
	// 		});
	// 	});
	// });

	// describe('create', () => {
	// 	it('should be function', () => {
	// 		expect(typeof service.create).toBe('function');
	// 	});

	// 	describe('when passed all required data to create a new user', () => {
	// 		it('should create and return a new user', async () => {
	// 			const userCreateInput = {
	// 				email: 'david.w.christian@gmail.com',
	// 				password: '12345678',
	// 			};
	// 			const [error, newUser] = await to(
	// 				service.create(userCreateInput)
	// 			);
	// 			expect(error).toBe(null);

	// 			expect(newUser.email).toBe('david.w.christian@gmail.com');
	// 			expect(newUser.password).toBe('12345678');
	// 			expect(newUser.firstName).toBe(null);
	// 			expect(newUser.lastName).toBe(null);
	// 			expect(newUser.role).toBe('USER');
	// 		});
	// 	});

	// 	describe('when missing required data to create a new user', () => {
	// 		describe('and is missing all the required data', () => {
	// 			it('should throw an error', async () => {
	// 				const userCreateInput = {
	// 					email: null,
	// 					password: null,
	// 				};
	// 				const [error, newUser] = await to(
	// 					service.create(userCreateInput)
	// 				);

	// 				expect(error).not.toBeNull();
	// 			});
	// 		});

	// 		describe('and is missing the email field', () => {
	// 			it('should throw an error', async () => {
	// 				const userCreateInput = {
	// 					email: null,
	// 					password: '12345678',
	// 				};
	// 				const [error, newUser] = await to(
	// 					service.create(userCreateInput)
	// 				);

	// 				expect(error[0]).not.toBeNull();
	// 			});
	// 		});

	// 		describe('and is missing the password field', () => {
	// 			it('should throw an error', async () => {
	// 				const userCreateInput = {
	// 					email: 'david.w.christian@gmail.com',
	// 					password: null,
	// 				};
	// 				const [error, newUser] = await to(
	// 					service.create(userCreateInput)
	// 				);

	// 				expect(error).not.toBeNull();
	// 			});
	// 		});
	// 	});

	// 	describe('when tries to create a new user and a unique attirribute has already been used', () => {
	// 		it('should return an error', async () => {
	// 			const userCreateInput = {
	// 				email: 'david.w.christian@gmail.com',
	// 				password: '12345678',
	// 			};
	// 			const [error, newUser] = await to(
	// 				service.create(userCreateInput)
	// 			);

	// 			expect(error).toBe(null);
	// 		});
	// 	});
	// });
});
