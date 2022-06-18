import request from 'supertest';
import UserProperty from '../users/enums/user-property.enum';
import { firstUser, password } from '../../prisma/users.seed';
import { INestApplication, HttpStatus } from '@nestjs/common';
import initializeTestApp from '../helpers/init/initializeTestApp';
import ErrorMessage from '../../src/graphql/errors/error-message.enum';
import ExtensionCode from '../../src/graphql/errors/extension-code.enum';
import { redisClient } from '../../src/server/initialize/initialize-redis';
import responseContainsSetCookie from '../helpers/utils/response-contains-set-cookie';

describe('Auth', () => {
	let app: INestApplication;

	beforeAll(async () => {
		app = await initializeTestApp();
	});

	afterAll(async () => {
		await redisClient.disconnect();
		await app.close();
	});

	describe('SignIn MetaMask', () => {
		describe('when logging in with a valid MetaMask signature', () => {
			let metaMaskInput;
			let expectedUserResponse;
			const { email, role } = firstUser;

			beforeEach(() => {
				metaMaskInput = {
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

			it('should login user', async () => {
				const query = {
					operationName: 'Mutation',
					query: `
						mutation Mutation($metaMaskInput: SessionInput!) {
							login(metaMaskInput: $metaMaskInput) {
								user {
									createdAt
									updatedAt
									role
									email
									id
								}
								isAuthenticated
							}
						}`,
					variables: {
						metaMaskInput,
					},
				};
				const response = (await request(app.getHttpServer())
					.post('/graphql')
					.set('x-forwarded-proto', 'https')
					.send(query)) as any;

				const { login } = response.body.data;
				const { isAuthenticated } = login;
				const { user } = login;

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(isAuthenticated).toEqual(true);
				expect(user).toEqual(expectedUserResponse);
				expect(user).not.toHaveProperty(UserProperty.PASSWORD);
				expect(responseContainsSetCookie(response)).toEqual(true);
			});
		});

		describe('validation', () => {
			describe('when sending no data', () => {
				let metaMaskInput;

				beforeEach(() => {
					metaMaskInput = {
						email: '',
						password: '',
					};
				});

				it("should respond with 'Unauthorized'", async () => {
					const query = {
						operationName: 'Mutation',
						query: `
							mutation Mutation($metaMaskInput: SessionInput!) {
								login(metaMaskInput: $metaMaskInput) {
									user {
										createdAt
										updatedAt
										role
										email
										id
									}
									isAuthenticated
								}
							}`,
						variables: {
							metaMaskInput,
						},
					};
					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(query);

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
			describe('when sending a valid email but incorrect password', () => {
				let metaMaskInput;
				const { email } = firstUser;

				beforeEach(() => {
					metaMaskInput = {
						email,
						password: 'incorrect-password',
					};
				});

				it("should respond with 'Unauthorized'", async () => {
					const query = {
						operationName: 'Mutation',
						query: `
							mutation Mutation($metaMaskInput: SessionInput!) {
								login(metaMaskInput: $metaMaskInput) {
									user {
										createdAt
										updatedAt
										role
										email
										id
									}
									isAuthenticated
								}
							}`,
						variables: {
							metaMaskInput,
						},
					};
					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(query);

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
			describe('when sending an invalid email and correct password', () => {
				let metaMaskInput;

				beforeEach(() => {
					metaMaskInput = {
						email: 'a-non-existent-email@gmail.com',
						password,
					};
				});

				it("should respond with 'Unauthorized'", async () => {
					const query = {
						operationName: 'Mutation',
						query: `
							mutation Mutation($metaMaskInput: SessionInput!) {
								login(metaMaskInput: $metaMaskInput) {
									user {
										createdAt
										updatedAt
										role
										email
										id
									}
									isAuthenticated
								}
							}`,
						variables: {
							metaMaskInput,
						},
					};
					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(query);

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
