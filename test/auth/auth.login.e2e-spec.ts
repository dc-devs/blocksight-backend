import * as request from 'supertest';
import UserProperty from '../users/enums/user-property.enum';
import { firstUser, password } from '../../prisma/users.seed';
import { INestApplication, HttpStatus } from '@nestjs/common';
import initializeTestApp from '../helpers/init/initializeTestApp';
import ErrorMessage from '../../src/graphql/errors/error-message.enum';
import ExtensionCode from '../../src/graphql/errors/extension-code.enum';

describe('Auth', () => {
	let app: INestApplication;

	beforeAll(async () => {
		app = await initializeTestApp();
	});

	afterAll(async () => {
		await app.close();
	});

	describe('Login', () => {
		describe('when logging in with a valid email and a password', () => {
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

			it('should login user', async () => {
				const query = {
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
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(query);

				const user = response.body.data.login.user;

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(user).toEqual(expectedUserResponse);
				expect(user).not.toHaveProperty(UserProperty.PASSWORD);
			});
		});

		describe('validation', () => {
			describe('when sending no data', () => {
				let sessionInput;

				beforeEach(() => {
					sessionInput = {
						email: '',
						password: '',
					};
				});

				it("should respond with 'Unauthorized'", async () => {
					const query = {
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
				let sessionInput;
				const { email } = firstUser;

				beforeEach(() => {
					sessionInput = {
						email,
						password: 'incorrect-password',
					};
				});

				it("should respond with 'Unauthorized'", async () => {
					const query = {
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
				let sessionInput;

				beforeEach(() => {
					sessionInput = {
						email: 'a-non-existent-email@gmail.com',
						password,
					};
				});

				it("should respond with 'Unauthorized'", async () => {
					const query = {
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
