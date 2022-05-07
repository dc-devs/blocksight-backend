import * as request from 'supertest';
import ErrorMessage from './enums/error-message.enum';
import UserProperty from './enums/user-property.enum';
import initializeTestApp from '../helpers/init/initializeTestApp';
import { INestApplication, HttpStatus } from '@nestjs/common';
import ExtensionCodes from '../../src/graphql/extension-codes.enum';
import expectedUserObject from './expected-objects/expected-user-object';

describe('Users', () => {
	let app: INestApplication;

	beforeAll(async () => {
		app = await initializeTestApp();
	});

	afterAll(async () => {
		await app.close();
	});

	describe('Find all', () => {
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
				const error = errors[0];
				const { message, extensions } = error;

				expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
				expect(errors.length).toEqual(1);
				expect(message).toEqual(
					ErrorMessage.EXTRA_PARAM_SHOULD_NOT_EXIST
				);
				expect(extensions.code).toEqual(
					ExtensionCodes.GRAPHQL_VALIDATION_FAILED
				);
			});
		});

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
					expect(user).not.toHaveProperty(UserProperty.PASSWORD);
				});
			});
		});

		describe('when sending a query with arguments', () => {
			describe("and the where argument aims to fetch users with 'role: SUPER_ADMIN' ", () => {
				it('should return all users with that role', async () => {
					const role = 'SUPER_ADMIN';
					const query = {
						operationName: 'Query',
						query: `
							query Query($where: UserWhereInput) {
								gusers(where: $where) {
									id
									email
									role
									createdAt
									updatedAt
								}
							}`,
						variables: {
							where: {
								role,
							},
						},
					};
					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(query);

					const users = response.body.data.gusers;

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(users).toHaveLength(1);

					users.forEach((user) => {
						expect(user).toEqual(expectedUserObject);
						expect(user).not.toHaveProperty(UserProperty.PASSWORD);
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
								query Query($skip: Int, $take: Int) {
  									gusers(skip: $skip, take: $take) {
										id
										email
										role
										createdAt
										updatedAt
									}
								}`,
							variables: {
								skip,
								take,
							},
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
								UserProperty.PASSWORD
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
								query Query($cursor: UserWhereUniqueInput, $take: Int) {
									gusers(cursor: $cursor, take: $take) {
										id
										email
										role
										createdAt
										updatedAt
									}
								}`,
							variables: {
								cursor,
								take,
							},
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
								UserProperty.PASSWORD
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
});
