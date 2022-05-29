import * as request from 'supertest';
import UserProperty from '../users/enums/user-property.enum';
import { firstUser, password } from '../../prisma/users.seed';
import { INestApplication, HttpStatus } from '@nestjs/common';
import initializeTestApp from '../helpers/init/initializeTestApp';
import ErrorMessage from '../../src/graphql/errors/error-message.enum';
import ExtensionCode from '../../src/graphql/errors/extension-code.enum';
import { redisClient } from '../../src/server/initialize/initialize-redis';
import getCookieFromResponse from '../helpers/utils/get-cookie-from-response';

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
								createdAt
								updatedAt
								role
								email
								id
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

					const cookieId = getCookieFromResponse(loginResponse);

					const currentUserQuery = {
						operationName: 'Query',
						query: `
							query Query {
								currentUser {
									id
									email
									role
									createdAt
									updatedAt
								}
							}`,
						variables: {
							sessionInput,
						},
					};

					console.log('');
					console.log('Cookie:', `_bb_session=${cookieId}`);
					console.log('');

					const response = await request(app.getHttpServer())
						.post('/graphql')
						.set('Cookie', [`_bb_session=${cookieId}`])
						.send(currentUserQuery);

					const user = response.body;

					console.log(user);

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(user).toEqual(expectedUserResponse);
					expect(user).not.toHaveProperty(UserProperty.PASSWORD);
				});
			});
		});
	});
});
