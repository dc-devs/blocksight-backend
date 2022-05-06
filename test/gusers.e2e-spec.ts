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

const enum ValidationErrors {
	ROLE_SHOULD_NOT_EXIST = 'property role should not exist',
	EMAIL_IS_EMAIL = 'email must be an email',
	PASSWORD_IS_STRING = 'password must be a string',
	PASSWORD_MIN_LENGTH = 'password must be longer than or equal to 8 characters',
	PASSWORD_SHOULD_NOT_EXIST = 'property password should not exist',
	CREATED_AT_SHOULD_NOT_EXIST = 'property createdAt should not exist',
	UPDATED_AT_SHOULD_NOT_EXIST = 'property updatedAt should not exist',
	EXTRA_PARAM_SHOULD_NOT_EXIST = 'Cannot query field "extraParam" on type "Guser".',
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
		describe('when sending a query to get all users', () => {
			it('should return all users', async () => {
				const query = {
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
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(query);

				const users = response.body.data.gusers;

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(users).toHaveLength(55);

				users.forEach((user) => {
					expect(user).toEqual(expectedUserObject);
					expect(user).not.toHaveProperty(UserProperties.PASSWORD);
				});
			});
		});

		describe('when sending a query with an unexpected user field', () => {
			it('should return with an unexpected field error', async () => {
				const extraParam = 'extraParam';
				const query = {
					operationName: 'Query',
					query: `
						query Query {
							gusers {
								id
								email
								role
								${extraParam}
								createdAt
								updatedAt
							}
						}`,
					variables: {},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(query);

				const errors = response.body.errors;
				const errorMessage = errors[0].message;

				expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
				expect(errors.length).toEqual(1);
				expect(errorMessage).toEqual(
					ValidationErrors.EXTRA_PARAM_SHOULD_NOT_EXIST
				);
			});
		});

		describe('when sending a query with arguments', () => {
			describe("and the where argument aims to fetch users with 'role: SUPER_ADMIN' ", () => {
				it('should return all users with that role', async () => {
					const role = 'SUPER_ADMIN';
					const query = {
						operationName: 'Query',
						query: `
						query Query {
							gusers(where: {
								role: "${role}"
							}) {
								id
								email
								role
								createdAt
								updatedAt
							}
						}`,
						variables: {},
					};
					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(query);

					const users = response.body.data.gusers;

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(users).toHaveLength(1);

					users.forEach((user) => {
						expect(user).toEqual(expectedUserObject);
						expect(user).not.toHaveProperty(
							UserProperties.PASSWORD
						);
						expect(user.role).toEqual(role);
					});
				});
			});
			describe('and the skip and take arguments are used to implement pagination', () => {
				describe('and the skip param is 10, and the take param is 10', () => {
					it('should return the first 10 users', async () => {
						const skip = 10;
						const take = 10;
						const query = {
							operationName: 'Query',
							query: `
							query Query {
								gusers(
									skip: ${skip}
									take: ${take}
								) {
									id
									email
									role
									createdAt
									updatedAt
								}
							}`,
							variables: {},
						};
						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(query);

						const users = response.body.data.gusers;

						expect(response.statusCode).toEqual(HttpStatus.OK);
						expect(users).toHaveLength(10);

						users.forEach((user) => {
							expect(user).toEqual(expectedUserObject);
							expect(user).not.toHaveProperty(
								UserProperties.PASSWORD
							);
						});

						const lastUser = users[users.length - 1];
						const lastUserId = skip + take;
						expect(lastUser.id).toEqual(lastUserId);
					});
				});
			});
			describe('and the cursor and take arguments are used to implement pagination', () => {
				describe('and the cursor param is 11, and the take param is 10', () => {
					it('should return the first 10 users', async () => {
						const cursor = { id: 11 };
						const take = 10;
						const query = {
							operationName: 'Query',
							query: `
							query Query {
								gusers(
									cursor: { id: 11 }
									take: ${take}
								) {
									id
									email
									role
									createdAt
									updatedAt
								}
							}`,
							variables: {},
						};
						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(query);

						const users = response.body.data.gusers;

						expect(response.statusCode).toEqual(HttpStatus.OK);
						expect(users).toHaveLength(10);

						users.forEach((user) => {
							expect(user).toEqual(expectedUserObject);
							expect(user).not.toHaveProperty(
								UserProperties.PASSWORD
							);
						});

						const lastUser = users[users.length - 1];
						const lastUserId = cursor.id + take - 1;
						expect(lastUser.id).toEqual(lastUserId);
					});
				});
			});
		});
	});

	describe('Get One', () => {
		describe('when sending a query with an id for user that does not exist', () => {
			it('should return null', async () => {
				const id = 100;
				const query = {
					operationName: 'Query',
					query: `
						query Query($id: Int!) {
							guser(id: $id) {
								id
								email
								role
								createdAt
								updatedAt
							}
						}`,
					variables: { id },
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(query);

				const guser = response.body.data.guser;

				expect(guser).toBeNull();
			});
		});
		describe('when route requested with an id for user that does exist', () => {
			it('should return user', async () => {
				const id = 1;
				const query = {
					operationName: 'Query',
					query: `
						query Query($id: Int!) {
							guser(id: $id) {
								id
								email
								role
								createdAt
								updatedAt
							}
						}`,
					variables: { id },
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(query);

				const user = response.body.data.guser;

				expect(user).toEqual(expectedUserObject);
				expect(user).not.toHaveProperty(UserProperties.PASSWORD);
			});
		});
	});

	// describe('Create', () => {
	// 	describe('when sending an email and a password', () => {
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

	// 	// describe('when passed no data', () => {
	// 	// 	let newUser;

	// 	// 	beforeEach(() => {
	// 	// 		newUser = {};
	// 	// 	});

	// 	// 	it('should return an error', async () => {
	// 	// 		const response = await request(app.getHttpServer())
	// 	// 			.post('/users')
	// 	// 			.send(newUser as CreateUserInput);

	// 	// 		expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
	// 	// 		expect(response.body.message).toEqual([
	// 	// 			Validation.EMAIL_IS_EMAIL,
	// 	// 			Validation.PASSWORD_MIN_LENGTH,
	// 	// 			Validation.PASSWORD_IS_STRING,
	// 	// 		]);
	// 	// 	});
	// 	// });

	// 	// describe('when passed only email', () => {
	// 	// 	let newUser;

	// 	// 	beforeEach(() => {
	// 	// 		newUser = {
	// 	// 			email: 'david-test-2@gmail.com',
	// 	// 		};
	// 	// 	});

	// 	// 	it('should return an error', async () => {
	// 	// 		const response = await request(app.getHttpServer())
	// 	// 			.post('/users')
	// 	// 			.send(newUser as CreateUserInput);

	// 	// 		expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
	// 	// 		expect(response.body.message).toEqual([
	// 	// 			Validation.PASSWORD_MIN_LENGTH,
	// 	// 			Validation.PASSWORD_IS_STRING,
	// 	// 		]);
	// 	// 	});
	// 	// });

	// 	// describe('when passed only password', () => {
	// 	// 	let newUser;

	// 	// 	beforeEach(() => {
	// 	// 		newUser = {
	// 	// 			password: '12345678',
	// 	// 		};
	// 	// 	});

	// 	// 	it('should return an error', async () => {
	// 	// 		const response = await request(app.getHttpServer())
	// 	// 			.post('/users')
	// 	// 			.send(newUser as CreateUserInput);

	// 	// 		expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
	// 	// 		expect(response.body.message).toEqual([
	// 	// 			Validation.EMAIL_IS_EMAIL,
	// 	// 		]);
	// 	// 	});
	// 	// });
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
