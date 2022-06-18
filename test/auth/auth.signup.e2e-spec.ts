import request from 'supertest';
import { UserRole } from '@prisma/client';
import { firstUser } from '../../prisma/users.seed';
import ErrorMessage from '../users/enums/error-message.enum';
import UserProperty from '../users/enums/user-property.enum';
import { INestApplication, HttpStatus } from '@nestjs/common';
import initializeTestApp from '../helpers/init/initializeTestApp';
import ExtensionCode from '../../src/graphql/errors/extension-code.enum';
import { redisClient } from '../../src/server/initialize/initialize-redis';
import UserValidationError from '../../src/models/users/validation-errors/user-validation-error.enum';

describe('Auth', () => {
	let app: INestApplication;

	beforeAll(async () => {
		app = await initializeTestApp();
	});

	afterAll(async () => {
		await redisClient.disconnect();
		await app.close();
	});

	describe('Signup', () => {
		describe('when signing up with a valid email and a password', () => {
			let email;
			let createUserEmailInput;
			let expectedUserResponse;

			beforeEach(() => {
				email = 'test-1@gmail.com';

				createUserEmailInput = {
					email,
					password: '12345678',
				};

				expectedUserResponse = expect.objectContaining({
					email,
					role: UserRole.USER,
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
				});
			});

			it('should create a new user', async () => {
				const query = {
					operationName: 'Mutation',
					query: `
						mutation Mutation($createUserEmailInput: CreateUserEmailInput!) {
							signUp(createUserEmailInput: $createUserEmailInput) {
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
						createUserEmailInput,
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(query);

				console.log(response.body);

				const { signUp } = response.body.data;
				const { isAuthenticated } = signUp;
				const { user } = signUp;

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(isAuthenticated).toEqual(true);
				expect(user).toEqual(expectedUserResponse);
				expect(user).not.toHaveProperty(UserProperty.PASSWORD);
			});
		});

		describe('validation', () => {
			describe('when sending no data', () => {
				let createUserEmailInput;

				beforeEach(() => {
					createUserEmailInput = {};
				});

				it('should return an error', async () => {
					const query = {
						operationName: 'Mutation',
						query: `
							mutation Mutation($createUserEmailInput: CreateUserEmailInput!) {
								signUp(createUserEmailInput: $createUserEmailInput) {
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
							createUserEmailInput,
						},
					};

					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(query);

					const errors = response.body.errors;
					const emailError = errors[0];
					const passwordError = errors[1];

					expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);

					expect(errors.length).toEqual(2);

					errors.forEach((error) => {
						expect(error.extensions.code).toEqual(
							ExtensionCode.BAD_USER_INPUT,
						);
					});

					expect(emailError.message).toContain(
						ErrorMessage.EMAIL_MUST_BE_STRING,
					);
					expect(passwordError.message).toContain(
						ErrorMessage.PASSWORD_MUST_BE_STRING,
					);
				});
			});

			describe('email', () => {
				describe('when missing email', () => {
					let createUserEmailInput;

					beforeEach(() => {
						createUserEmailInput = {
							password: '123456789',
						};
					});

					it('should return an error', async () => {
						const query = {
							operationName: 'Mutation',
							query: `
								mutation Mutation($createUserEmailInput: CreateUserEmailInput!) {
									signUp(createUserEmailInput: $createUserEmailInput) {
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
								createUserEmailInput,
							},
						};
						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(query);

						const errors = response.body.errors;
						const emailError = errors[0];

						expect(response.statusCode).toEqual(
							HttpStatus.BAD_REQUEST,
						);

						expect(errors.length).toEqual(1);

						expect(emailError.extensions.code).toEqual(
							ExtensionCode.BAD_USER_INPUT,
						);

						expect(emailError.message).toContain(
							ErrorMessage.EMAIL_REQUIRED,
						);
					});
				});

				describe('when sending an email that is not an email', () => {
					let createUserEmailInput;

					beforeEach(() => {
						createUserEmailInput = {
							email: 'david-test-2',
							password: '123456789',
						};
					});

					it('should return an error', async () => {
						const query = {
							operationName: 'Mutation',
							query: `
								mutation Mutation($createUserEmailInput: CreateUserEmailInput!) {
									signUp(createUserEmailInput: $createUserEmailInput) {
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
								createUserEmailInput,
							},
						};
						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(query);

						const errors = response.body.errors;
						const emailError = errors[0];
						const { extensions } = emailError;

						expect(response.statusCode).toEqual(HttpStatus.OK);

						expect(errors.length).toEqual(1);

						expect(extensions.code).toEqual(
							ExtensionCode.BAD_USER_INPUT,
						);

						expect(extensions.response.message).toContain(
							ErrorMessage.EMAIL_IS_EMAIL,
						);
					});
				});

				describe('when sending an email that already exists', () => {
					let createUserEmailInput;

					beforeEach(() => {
						createUserEmailInput = {
							email: firstUser.email,
							password: '123456789',
						};
					});

					it('should return an error', async () => {
						const query = {
							operationName: 'Mutation',
							query: `
								mutation Mutation($createUserEmailInput: CreateUserEmailInput!) {
									signUp(createUserEmailInput: $createUserEmailInput) {
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
								createUserEmailInput,
							},
						};
						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(query);

						const errors = response.body.errors;
						const error = errors[0];
						const { extensions } = error;
						const emailError = extensions.errors.email;

						expect(response.statusCode).toEqual(HttpStatus.OK);
						expect(errors.length).toEqual(1);

						expect(emailError.type).toEqual(
							ExtensionCode.BAD_USER_INPUT,
						);

						expect(emailError.message).toEqual(
							UserValidationError.EMAIL_IS_TAKEN,
						);
					});
				});
			});

			describe('password', () => {
				describe('when missing password', () => {
					let createUserEmailInput;

					beforeEach(() => {
						createUserEmailInput = {
							email: 'david-test-2@gmail.com',
						};
					});

					it('should return an error', async () => {
						const query = {
							operationName: 'Mutation',
							query: `
								mutation Mutation($createUserEmailInput: CreateUserEmailInput!) {
									signUp(createUserEmailInput: $createUserEmailInput) {
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
								createUserEmailInput,
							},
						};
						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(query);

						const errors = response.body.errors;
						const passwordError = errors[0];

						expect(response.statusCode).toEqual(
							HttpStatus.BAD_REQUEST,
						);

						expect(errors.length).toEqual(1);

						expect(passwordError.extensions.code).toEqual(
							ExtensionCode.BAD_USER_INPUT,
						);

						expect(passwordError.message).toContain(
							ErrorMessage.PASSWORD_REQUIRED,
						);
					});
				});

				describe('when sending a password that is not long enough', () => {
					let createUserEmailInput;

					beforeEach(() => {
						createUserEmailInput = {
							email: 'david-test-2@gmail.com',
							password: '1234567',
						};
					});

					it('should return an error', async () => {
						const query = {
							operationName: 'Mutation',
							query: `
								mutation Mutation($createUserEmailInput: CreateUserEmailInput!) {
									signUp(createUserEmailInput: $createUserEmailInput) {
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
								createUserEmailInput,
							},
						};
						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(query);

						const errors = response.body.errors;
						const passwordError = errors[0];
						const { extensions } = passwordError;

						expect(response.statusCode).toEqual(HttpStatus.OK);

						expect(errors.length).toEqual(1);

						expect(extensions.code).toEqual(
							ExtensionCode.BAD_USER_INPUT,
						);

						expect(extensions.response.message).toContain(
							ErrorMessage.PASSWORD_MIN_LENGTH,
						);
					});
				});
			});
		});
	});
});
