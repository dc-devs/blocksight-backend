import request from 'supertest';
import { UserRole } from '@prisma/client';
import ErrorMessage from './enums/error-message.enum';
import UserProperty from './enums/user-property.enum';
import { INestApplication, HttpStatus } from '@nestjs/common';
import initializeTestApp from '../helpers/init/initializeTestApp';
import ExtensionCode from '../../src/graphql/errors/extension-code.enum';
import expectedUserObject from './expected-objects/expected-user-object';
import { redisClient } from '../../src/server/initialize/initialize-redis';
import {
	allUsersCount,
	thirdUser as thirdUserAdmin,
	secondUser as secondUserAdmin,
	firstUser as firstUserSuperAdmin,
} from '../../prisma/users.seed';

describe('Users', () => {
	let app: INestApplication;

	beforeAll(async () => {
		app = await initializeTestApp();
	});

	afterAll(async () => {
		await redisClient.disconnect();
		await app.close();
	});

	describe('Find all', () => {
		describe('when sending a query to get all users', () => {
			it('should return all users', async () => {
				const query = {
					operationName: 'Query',
					query: `
						query Query($findAllUsersInput: FindAllUsersInput!) {
							findAllUsers(findAllUsersInput: $findAllUsersInput) {
								id
								role
								email
								primaryWalletAddress
								createdAt
								updatedAt
							}
						}`,
					variables: {
						findAllUsersInput: {},
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(query);

				const users = response.body.data.findAllUsers;

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(users.length <= allUsersCount).toBe(true);

				users.forEach((user) => {
					expect(user).toEqual(expectedUserObject);
					expect(user).not.toHaveProperty(UserProperty.PASSWORD);
				});
			});
		});

		describe('when sending a query with arguments', () => {
			describe('where', () => {
				describe("and the where argument aims to fetch users with 'role: SUPER_ADMIN'", () => {
					it('should return all users with that role', async () => {
						const query = {
							operationName: 'Query',
							query: `
							query Query($findAllUsersInput: FindAllUsersInput!) {
								findAllUsers(findAllUsersInput: $findAllUsersInput) {
									id
									role
									email
									primaryWalletAddress
									createdAt
									updatedAt
								}
							}`,
							variables: {
								findAllUsersInput: {
									where: {
										role: UserRole.SUPER_ADMIN,
									},
								},
							},
						};

						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(query);

						const users = response.body.data.findAllUsers;

						expect(response.statusCode).toEqual(HttpStatus.OK);
						expect(users).toHaveLength(1);

						users.forEach((user) => {
							expect(user).toEqual(expectedUserObject);
							expect(user).not.toHaveProperty(
								UserProperty.PASSWORD,
							);
							expect(user.role).toEqual(UserRole.SUPER_ADMIN);
						});
					});
				});

				describe("and the where AND argument aims to fetch one users with 'role: ADMIN' and a specified email", () => {
					it('should return all users with that role', async () => {
						const query = {
							operationName: 'Query',
							query: `
							query Query($findAllUsersInput: FindAllUsersInput!) {
								findAllUsers(findAllUsersInput: $findAllUsersInput) {
									id
									role
									email
									primaryWalletAddress
									createdAt
									updatedAt
								}
							}`,
							variables: {
								findAllUsersInput: {
									where: {
										role: UserRole.ADMIN,
										AND: [{ email: thirdUserAdmin.email }],
									},
								},
							},
						};

						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(query);

						const users = response.body.data.findAllUsers;
						const user = users[0];

						expect(response.statusCode).toEqual(HttpStatus.OK);

						expect(users).toHaveLength(1);

						expect(user.role).toEqual(UserRole.ADMIN);
						expect(user.email).toEqual(thirdUserAdmin.email);
						expect(user).toEqual(expectedUserObject);
						expect(user).not.toHaveProperty(UserProperty.PASSWORD);
					});
				});

				describe("and the where NOT argument aims to fetch one users with 'role: ADMIN' and not a specified email", () => {
					it('should return all users with that role', async () => {
						const query = {
							operationName: 'Query',
							query: `
							query Query($findAllUsersInput: FindAllUsersInput!) {
								findAllUsers(findAllUsersInput: $findAllUsersInput) {
									id
									role
									email
									primaryWalletAddress
									createdAt
									updatedAt
								}
							}`,
							variables: {
								findAllUsersInput: {
									where: {
										role: UserRole.ADMIN,
										NOT: [{ email: thirdUserAdmin.email }],
									},
								},
							},
						};

						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(query);

						const users = response.body.data.findAllUsers;
						const user = users[0];

						expect(response.statusCode).toEqual(HttpStatus.OK);

						expect(users).toHaveLength(2);

						expect(user.role).toEqual(UserRole.ADMIN);
						expect(user.email).toEqual(secondUserAdmin.email);
						expect(user).toEqual(expectedUserObject);
						expect(user).not.toHaveProperty(UserProperty.PASSWORD);
					});
				});

				describe("and the where OR argument aims to fetch one users with 'role: ADMIN' or 'role: SUPER_ADMIN'", () => {
					it('should return all users with that role', async () => {
						const query = {
							operationName: 'Query',
							query: `
							query Query($findAllUsersInput: FindAllUsersInput!) {
								findAllUsers(findAllUsersInput: $findAllUsersInput) {
									id
									role
									email
									primaryWalletAddress
									createdAt
									updatedAt
								}
							}`,
							variables: {
								findAllUsersInput: {
									where: {
										OR: [
											{ role: UserRole.ADMIN },
											{ role: UserRole.SUPER_ADMIN },
										],
									},
								},
							},
						};

						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(query);

						const users = response.body.data.findAllUsers;
						const firstSelectedUser = users[0];
						const thirdSelectedUser = users[2];

						expect(response.statusCode).toEqual(HttpStatus.OK);

						expect(users).toHaveLength(4);

						expect(firstSelectedUser.role).toEqual(
							firstUserSuperAdmin.role,
						);
						expect(firstSelectedUser.email).toEqual(
							firstUserSuperAdmin.email,
						);

						expect(thirdSelectedUser.role).toEqual(
							thirdUserAdmin.role,
						);
						expect(thirdSelectedUser.email).toEqual(
							thirdUserAdmin.email,
						);

						users.forEach((user) => {
							expect(user).toEqual(expectedUserObject);
							expect(user).not.toHaveProperty(
								UserProperty.PASSWORD,
							);
						});
					});
				});
			});

			describe('pagination', () => {
				describe('and the skip and take arguments are used to implement pagination', () => {
					describe('and the skip param is 10, and the take param is 10', () => {
						it('should return the first 10 users', async () => {
							const skip = 10;
							const take = 10;
							const query = {
								operationName: 'Query',
								query: `
									query Query($findAllUsersInput: FindAllUsersInput!) {
										findAllUsers(findAllUsersInput: $findAllUsersInput) {
											id
											role
											email
											primaryWalletAddress
											createdAt
											updatedAt
										}
									}`,
								variables: {
									findAllUsersInput: {
										skip,
										take,
									},
								},
							};
							const response = await request(app.getHttpServer())
								.post('/graphql')
								.send(query);

							const users = response.body.data.findAllUsers;

							expect(response.statusCode).toEqual(HttpStatus.OK);
							expect(users).toHaveLength(10);

							users.forEach((user) => {
								expect(user).toEqual(expectedUserObject);
								expect(user).not.toHaveProperty(
									UserProperty.PASSWORD,
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
									query Query($findAllUsersInput: FindAllUsersInput!) {
										findAllUsers(findAllUsersInput: $findAllUsersInput) {
											id
											role
											email
											primaryWalletAddress
											createdAt
											updatedAt
										}
									}`,
								variables: {
									findAllUsersInput: {
										cursor,
										take,
									},
								},
							};

							const response = await request(app.getHttpServer())
								.post('/graphql')
								.send(query);

							const users = response.body.data.findAllUsers;

							expect(response.statusCode).toEqual(HttpStatus.OK);
							expect(users).toHaveLength(10);

							users.forEach((user) => {
								expect(user).toEqual(expectedUserObject);
								expect(user).not.toHaveProperty(
									UserProperty.PASSWORD,
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

		describe('validation', () => {
			describe('when sending a query with an unexpected user field', () => {
				it('should return with an unexpected field error', async () => {
					const extraParam = 'extraParam';
					const query = {
						operationName: 'Query',
						query: `
							query Query($findAllUsersInput: FindAllUsersInput!) {
								findAllUsers(findAllUsersInput: $findAllUsersInput) {
									id
									role
									email
									primaryWalletAddress
									createdAt
									updatedAt
									${extraParam}
								}
							}`,
						variables: {},
					};
					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(query);

					const errors = response.body.errors;
					const error = errors[0];
					const { message, extensions } = error;

					expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
					expect(errors.length).toEqual(1);
					expect(message).toEqual(
						ErrorMessage.EXTRA_PARAM_SHOULD_NOT_EXIST,
					);
					expect(extensions.code).toEqual(
						ExtensionCode.GRAPHQL_VALIDATION_FAILED,
					);
				});
			});
		});
	});
});
