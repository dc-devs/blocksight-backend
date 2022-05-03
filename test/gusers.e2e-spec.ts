import { GraphQLSchemaHost } from '@nestjs/graphql';
import { User, Prisma } from '@prisma/client';
import * as request from 'supertest';
import initializeTestApp from './init/initializeTestApp';
import { CreateUserInput } from '../src/users/dto/create-user.input';
import { UpdateUserInput } from '../src/users/dto/update-user.input';
import { INestApplication, HttpStatus } from '@nestjs/common';
import expectedUserObject from './helpers/expectedModelObjects/expectedUserObject';

const enum UserProperties {
	PASSWORD = 'password',
}

const enum Validation {
	ROLE_SHOULD_NOT_EXIST = 'property role should not exist',
	EMAIL_IS_EMAIL = 'email must be an email',
	PASSWORD_IS_STRING = 'password must be a string',
	PASSWORD_MIN_LENGTH = 'password must be longer than or equal to 8 characters',
	PASSWORD_SHOULD_NOT_EXIST = 'property password should not exist',
	CREATED_AT_SHOULD_NOT_EXIST = 'property createdAt should not exist',
	UPDATED_AT_SHOULD_NOT_EXIST = 'property updatedAt should not exist',
	EXTRA_PARAM_SHOULD_NOT_EXIST = 'property extraParam should not exist',
}

describe('Users', () => {
	let app: INestApplication;

	beforeAll(async () => {
		app = await initializeTestApp();
	});

	afterAll(async () => {
		await app.close();
	});

	describe('Get all', () => {
		describe('when route requested with no query parameters', () => {
			it('should return all users', async () => {
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send({
						operationName: 'Query',
						query: `
						query Query {
							gusers {
								id
								email
								role
								createdAt
								updatedAt
							}
						}`,
						variables: {},
					});
				

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(response.body.data.gusers).toHaveLength(55);

				response.body.data.gusers.forEach((user) => {
					expect(user).toEqual(expectedUserObject);
					expect(user).not.toHaveProperty(UserProperties.PASSWORD);
				});
			});
		});

		// describe('when route requested with an unexpected query parameter', () => {
		// 	it('should return with an unexpected parameter error', async () => {
		// 		const extraParam = 'extraParam';
		// 		const response = await request(app.getHttpServer()).get(
		// 			`/users?skip=10&take=10&${extraParam}=test`
		// 		);

		// 		expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
		// 		expect(response.body.message).toEqual([
		// 			Validation.EXTRA_PARAM_SHOULD_NOT_EXIST,
		// 		]);
		// 	});
		// });

		// describe('when route requested with query parameters', () => {
		// 	describe('and the where param contains aims to fetch users with role equal to', () => {
		// 		it('should return all users with that email', async () => {
		// 			const role = 'USER';
		// 			const response = await request(app.getHttpServer()).get(
		// 				`/users?where={"role":{"equals":"${role}"}}`
		// 			);

		// 			expect(response.statusCode).toEqual(HttpStatus.OK);
		// 			expect(response.body).toHaveLength(53);

		// 			response.body.forEach((user) => {
		// 				expect(user).toEqual(expectedUserObject);
		// 				expect(user).not.toHaveProperty(
		// 					UserProperties.PASSWORD
		// 				);
		// 				expect(user.role).toEqual(role);
		// 			});
		// 		});
		// 	});
		// 	describe('and the skip and take params are used to implement pagination', () => {
		// 		describe('and the skip param is 0, and the take param is 10', () => {
		// 			it('should return the first 10 users', async () => {
		// 				const skip = 0;
		// 				const take = 10;
		// 				const response = await request(app.getHttpServer()).get(
		// 					`/users?skip=${skip}&take=${take}`
		// 				);

		// 				expect(response.statusCode).toEqual(HttpStatus.OK);
		// 				expect(response.body).toHaveLength(10);

		// 				response.body.forEach((user) => {
		// 					expect(user).toEqual(expectedUserObject);
		// 					expect(user).not.toHaveProperty(
		// 						UserProperties.PASSWORD
		// 					);
		// 				});

		// 				const lastUser =
		// 					response.body[response.body.length - 1];
		// 				expect(lastUser.id).toEqual(skip + take);
		// 			});
		// 		});
		// 		describe('and the skip param is 10, and the take param is 10', () => {
		// 			it('should return the first 10 users', async () => {
		// 				const skip = 10;
		// 				const take = 10;
		// 				const response = await request(app.getHttpServer()).get(
		// 					`/users?skip=${skip}&take=${take}`
		// 				);

		// 				expect(response.statusCode).toEqual(HttpStatus.OK);
		// 				expect(response.body).toHaveLength(10);

		// 				response.body.forEach((user) => {
		// 					expect(user).toEqual(expectedUserObject);
		// 					expect(user).not.toHaveProperty(
		// 						UserProperties.PASSWORD
		// 					);
		// 				});

		// 				const lastUser =
		// 					response.body[response.body.length - 1];
		// 				expect(lastUser.id).toEqual(skip + take);
		// 			});
		// 		});
		// 	});
		// });
	});

	// describe('Get one [Get /:id]', () => {
	// 	describe('when route requested with an id for user that does not exist', () => {
	// 		it('should return error not found', async () => {
	// 			const response = await request(app.getHttpServer()).get(
	// 				'/users/100'
	// 			);

	// 			expect(response.statusCode).toEqual(HttpStatus.NOT_FOUND);
	// 		});
	// 	});
	// 	describe('when route requested with an id for user that does exist', () => {
	// 		it('should return user', async () => {
	// 			const response = await request(app.getHttpServer()).get(
	// 				'/users/1'
	// 			);

	// 			expect(response.statusCode).toEqual(HttpStatus.OK);
	// 			expect(response.body).toEqual(expectedUserObject);
	// 			expect(response.body).not.toHaveProperty(
	// 				UserProperties.PASSWORD
	// 			);
	// 		});
	// 	});
	// });

	// describe('Create [Post /]', () => {
	// 	describe('when passed an email and a password', () => {
	// 		let newUser;

	// 		beforeEach(() => {
	// 			newUser = {
	// 				email: 'test-1@gmail.com',
	// 				password: '12345678',
	// 			};
	// 		});

	// 		it('should create a new user', async () => {
	// 			const expectedUserResponse = expect.objectContaining({
	// 				email: 'test-1@gmail.com',
	// 				role: 'USER',
	// 				createdAt: expect.any(String),
	// 				updatedAt: expect.any(String),
	// 			});

	// 			const response = await request(app.getHttpServer())
	// 				.post('/users')
	// 				.send(newUser as CreateUserInput);

	// 			expect(response.statusCode).toEqual(HttpStatus.CREATED);
	// 			expect(response.body).toEqual(expectedUserResponse);
	// 		});
	// 	});

	// 	describe('when passed no data', () => {
	// 		let newUser;

	// 		beforeEach(() => {
	// 			newUser = {};
	// 		});

	// 		it('should return an error', async () => {
	// 			const response = await request(app.getHttpServer())
	// 				.post('/users')
	// 				.send(newUser as CreateUserInput);

	// 			expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
	// 			expect(response.body.message).toEqual([
	// 				Validation.EMAIL_IS_EMAIL,
	// 				Validation.PASSWORD_MIN_LENGTH,
	// 				Validation.PASSWORD_IS_STRING,
	// 			]);
	// 		});
	// 	});

	// 	describe('when passed only email', () => {
	// 		let newUser;

	// 		beforeEach(() => {
	// 			newUser = {
	// 				email: 'david-test-2@gmail.com',
	// 			};
	// 		});

	// 		it('should return an error', async () => {
	// 			const response = await request(app.getHttpServer())
	// 				.post('/users')
	// 				.send(newUser as CreateUserInput);

	// 			expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
	// 			expect(response.body.message).toEqual([
	// 				Validation.PASSWORD_MIN_LENGTH,
	// 				Validation.PASSWORD_IS_STRING,
	// 			]);
	// 		});
	// 	});

	// 	describe('when passed only password', () => {
	// 		let newUser;

	// 		beforeEach(() => {
	// 			newUser = {
	// 				password: '12345678',
	// 			};
	// 		});

	// 		it('should return an error', async () => {
	// 			const response = await request(app.getHttpServer())
	// 				.post('/users')
	// 				.send(newUser as CreateUserInput);

	// 			expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
	// 			expect(response.body.message).toEqual([
	// 				Validation.EMAIL_IS_EMAIL,
	// 			]);
	// 		});
	// 	});
	// });

	// describe('Update one [Patch /:id]', () => {
	// 	describe('when passed a valid user id and invalid udpate data', () => {
	// 		let updateUserInput;

	// 		beforeEach(() => {
	// 			updateUserInput = {
	// 				email: 'test@gmail.com',
	// 				role: 'ADMIN',
	// 				password: '12345678',
	// 				createdAt: '2022-04-23T23:05:10.681Z',
	// 				updatedAt: '2022-04-23T23:05:10.682Z',
	// 			};
	// 		});

	// 		it('should return a error', async () => {
	// 			const id = 20;
	// 			const response = await request(app.getHttpServer())
	// 				.patch(`/users/${id}`)
	// 				.send(updateUserInput as UpdateUserInput);

	// 			expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
	// 			expect(response.body.message).toEqual([
	// 				Validation.ROLE_SHOULD_NOT_EXIST,
	// 				Validation.PASSWORD_SHOULD_NOT_EXIST,
	// 				Validation.CREATED_AT_SHOULD_NOT_EXIST,
	// 				Validation.UPDATED_AT_SHOULD_NOT_EXIST,
	// 			]);
	// 		});
	// 	});

	// 	describe('when passed an invalid user id and udpate data', () => {
	// 		let updateUserInput;

	// 		beforeEach(() => {
	// 			updateUserInput = {
	// 				email: 'test@gmail.com',
	// 			};
	// 		});

	// 		it('should throw an error', async () => {
	// 			const id = 100;
	// 			const response = await request(app.getHttpServer())
	// 				.patch(`/users/${id}`)
	// 				.send(updateUserInput as UpdateUserInput);

	// 			expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
	// 		});
	// 	});

	// 	describe('when passed a valid user id and udpate data', () => {
	// 		let updateUserInput;

	// 		beforeEach(() => {
	// 			updateUserInput = {
	// 				email: 'test@gmail.com',
	// 			};
	// 		});

	// 		it('should update user', async () => {
	// 			const id = 20;
	// 			const expectedUserResponse = expect.objectContaining({
	// 				id,
	// 				...updateUserInput,
	// 				createdAt: expect.any(String),
	// 				updatedAt: expect.any(String),
	// 			});
	// 			const response = await request(app.getHttpServer())
	// 				.patch(`/users/${id}`)
	// 				.send(updateUserInput as UpdateUserInput);

	// 			expect(response.statusCode).toEqual(HttpStatus.OK);
	// 			expect(response.body).toEqual(expectedUserResponse);
	// 		});
	// 	});
	// });

	// describe('Delete one [Delete /:id]', () => {
	// 	describe('when passed a valid user id', () => {
	// 		it('should delete that user', async () => {
	// 			const id = 50;
	// 			const response = await request(app.getHttpServer()).delete(
	// 				`/users/${id}`
	// 			);

	// 			expect(response.body).toEqual(expectedUserObject);
	// 		});
	// 	});
	// });
});
