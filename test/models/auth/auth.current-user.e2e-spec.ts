import request from 'supertest';
import UserProperty from '../users/enums/user-property.enum';
import { firstUser, password } from '../../../prisma/seeds/users.seed';
import { INestApplication, HttpStatus } from '@nestjs/common';
import initializeTestApp from '../../helpers/init/initializeTestApp';
import ErrorMessage from '../../../src/graphql/errors/error-message.enum';
import ExtensionCode from '../../../src/graphql/errors/extension-code.enum';
import { redisClient } from '../../../src/server/initialize/initialize-redis';
import getCookieFromResponse from '../../helpers/utils/get-cookie-from-response';

describe('Auth', () => {
	let app: INestApplication;

	beforeAll(async () => {
		app = await initializeTestApp();
	});

	afterAll(async () => {
		await redisClient.disconnect();
		await app.close();
	});

	describe('Current User', () => {
		describe('when logging in with a valid email and a password', () => {
			describe('and fetching current user', () => {
				let sessionInput;
				let expectedUserResponse;
				const { email, role } = firstUser;

				beforeEach(() => {
					sessionInput = {
						email,
						password,
					};

					expectedUserResponse = expect.objectContaining({
						id: expect.any(Number),
						role,
						email,
						createdAt: expect.any(String),
						updatedAt: expect.any(String),
					});
				});

				it('should return current user', async () => {
					const loginQuery = {
						operationName: 'Mutation',
						query: `
						mutation Mutation($sessionInput: SessionInput!) {
							login(sessionInput: $sessionInput) {
								user {
									id
									email
									primaryWalletAddress
									role
									createdAt
									updatedAt
								}
							}
						}`,
						variables: {
							sessionInput,
						},
					};
					const loginResponse = (await request(app.getHttpServer())
						.post('/graphql')
						.set('x-forwarded-proto', 'https')
						.send(loginQuery)) as any;

					const cookie = getCookieFromResponse(loginResponse);

					const currentUserQuery = {
						operationName: 'Query',
						query: `
							query Query {
								currentUser {
									user {
										id
										email
										primaryWalletAddress
										role
										createdAt
										updatedAt
									}
									isAuthenticated
								}
							}`,
						variables: {
							sessionInput,
						},
					};

					const response = await request(app.getHttpServer())
						.post('/graphql')
						.set('Cookie', [cookie])
						.send(currentUserQuery);

					const { currentUser } = response.body.data;
					const { isAuthenticated } = currentUser;
					const { user } = currentUser;

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(isAuthenticated).toEqual(true);
					expect(user).toEqual(expectedUserResponse);
					expect(user).not.toHaveProperty(UserProperty.PASSWORD);
				});
			});
		});

		describe('validation', () => {
			describe('when not logged in', () => {
				describe('and fetching current user', () => {
					it('should return current user', async () => {
						const currentUserQuery = {
							operationName: 'Query',
							query: `
							query Query {
								currentUser {
									user {
										id
										email
										primaryWalletAddress
										role
										createdAt
										updatedAt
									}
									isAuthenticated
								}
							}`,
							variables: {},
						};

						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(currentUserQuery);

						const errors = response.body.errors;
						const unauthorizedError = errors[0];

						expect(unauthorizedError.message).toEqual(
							ErrorMessage.UNAUTHORIZED,
						);

						expect(unauthorizedError.extensions.code).toEqual(
							ExtensionCode.UNAUTHENTICATED,
						);

						expect(
							unauthorizedError.extensions.response.statusCode,
						).toEqual(HttpStatus.UNAUTHORIZED);
					});
				});
			});
		});
	});
});
