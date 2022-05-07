import * as request from 'supertest';
import { UserRole } from '@prisma/client';
import { firstUser } from '../../prisma/users.seed';
import ErrorCode from 'src/prisma/error-code.enum';
import ErrorMessage from './enums/error-message.enum';
import UserProperty from './enums/user-property.enum';
import { INestApplication, HttpStatus } from '@nestjs/common';
import initializeTestApp from '../helpers/init/initializeTestApp';
import ExtensionCodes from '../../src/graphql/extension-codes.enum';

describe('Users', () => {
	let app: INestApplication;

	beforeAll(async () => {
		app = await initializeTestApp();
	});

	afterAll(async () => {
		await app.close();
	});

	describe('Create', () => {
		describe('when sending a valid email and a password', () => {
			let email;
			let createUserInput;
			let expectedUserResponse;

			beforeEach(() => {
				email = 'test-1@gmail.com';

				createUserInput = {
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
						mutation Mutation($createUserInput: CreateUserInput!) {
							createUser(createUserInput: $createUserInput) {
								id
								email
								role
								createdAt
								updatedAt
							}
						}`,
					variables: {
						createUserInput,
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(query);

				const user = response.body.data.createUser;

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(user).toEqual(expectedUserResponse);
				expect(user).not.toHaveProperty(UserProperty.PASSWORD);
			});
		});

		describe('validation', () => {
			describe('when sending no data', () => {
				let createUserInput;

				beforeEach(() => {
					createUserInput = {};
				});

				it('should return an error', async () => {
					const query = {
						operationName: 'Mutation',
						query: `
							mutation Mutation($createUserInput: CreateUserInput!) {
								createUser(createUserInput: $createUserInput) {
									id
									email
									role
									createdAt
									updatedAt
								}
							}`,
						variables: {
							createUserInput,
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
							ExtensionCodes.BAD_USER_INPUT
						);
					});

					expect(emailError.message).toContain(
						ErrorMessage.EMAIL_MUST_BE_STRING
					);
					expect(passwordError.message).toContain(
						ErrorMessage.PASSWORD_MUST_BE_STRING
					);
				});
			});

			describe('email', () => {
				describe('when missing email', () => {
					let createUserInput;

					beforeEach(() => {
						createUserInput = {
							password: '123456789',
						};
					});

					it('should return an error', async () => {
						const query = {
							operationName: 'Mutation',
							query: `
								mutation Mutation($createUserInput: CreateUserInput!) {
									createUser(createUserInput: $createUserInput) {
										id
										email
										role
										createdAt
										updatedAt
									}
								}`,
							variables: {
								createUserInput,
							},
						};
						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(query);

						const errors = response.body.errors;
						const emailError = errors[0];

						expect(response.statusCode).toEqual(
							HttpStatus.BAD_REQUEST
						);

						expect(errors.length).toEqual(1);

						expect(emailError.extensions.code).toEqual(
							ExtensionCodes.BAD_USER_INPUT
						);

						expect(emailError.message).toContain(
							ErrorMessage.EMAIL_REQUIRED
						);
					});
				});

				describe('when sending an email that is not an email', () => {
					let createUserInput;

					beforeEach(() => {
						createUserInput = {
							email: 'david-test-2',
							password: '123456789',
						};
					});

					it('should return an error', async () => {
						const query = {
							operationName: 'Mutation',
							query: `
								mutation Mutation($createUserInput: CreateUserInput!) {
									createUser(createUserInput: $createUserInput) {
										id
										email
										role
										createdAt
										updatedAt
									}
								}`,
							variables: {
								createUserInput,
							},
						};
						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(query);

						const errors = response.body.errors;
						const emailError = errors[0];
						const {extensions} = emailError;

						expect(response.statusCode).toEqual(HttpStatus.OK);

						expect(errors.length).toEqual(1);

						expect(extensions.code).toEqual(
							ExtensionCodes.BAD_USER_INPUT
						);

						expect(
							extensions.response.message
						).toContain(ErrorMessage.EMAIL_IS_EMAIL);
					});
				});

				describe('when sending an email that already exists', () => {
					let createUserInput;

					beforeEach(() => {
						createUserInput = {
							email: firstUser.email,
							password: '123456789',
						};
					});

					it('should return an error', async () => {
						const query = {
							operationName: 'Mutation',
							query: `
								mutation Mutation($createUserInput: CreateUserInput!) {
									createUser(createUserInput: $createUserInput) {
										id
										email
										role
										createdAt
										updatedAt
									}
								}`,
							variables: {
								createUserInput,
							},
						};
						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(query);

						const errors = response.body.errors;
						const emailError = errors[0];
						const { extensions } = emailError;
						const { exception } = extensions;

						expect(response.statusCode).toEqual(HttpStatus.OK);
						expect(errors.length).toEqual(1);

						expect(extensions.code).toEqual(
							ExtensionCodes.INTERNAL_SERVER_ERROR
						);

						expect(exception.code).toEqual(
							ErrorCode.UNIQUE_CONSTRAINT
						);

						expect(exception.meta.target).toContain(
							UserProperty.EMAIL
						);
					});
				});
			});

			describe('password', () => {
				describe('when missing password', () => {
					let createUserInput;

					beforeEach(() => {
						createUserInput = {
							email: 'david-test-2@gmail.com',
						};
					});

					it('should return an error', async () => {
						const query = {
							operationName: 'Mutation',
							query: `
								mutation Mutation($createUserInput: CreateUserInput!) {
									createUser(createUserInput: $createUserInput) {
										id
										email
										role
										createdAt
										updatedAt
									}
								}`,
							variables: {
								createUserInput,
							},
						};
						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(query);

						const errors = response.body.errors;
						const passwordError = errors[0];

						expect(response.statusCode).toEqual(
							HttpStatus.BAD_REQUEST
						);

						expect(errors.length).toEqual(1);

						expect(passwordError.extensions.code).toEqual(
							ExtensionCodes.BAD_USER_INPUT
						);

						expect(passwordError.message).toContain(
							ErrorMessage.PASSWORD_REQUIRED
						);
					});
				});
				
				describe('when sending a password that is not long enough', () => {
					let createUserInput;

					beforeEach(() => {
						createUserInput = {
							email: 'david-test-2@gmail.com',
							password: '1234567',
						};
					});

					it('should return an error', async () => {
						const query = {
							operationName: 'Mutation',
							query: `
								mutation Mutation($createUserInput: CreateUserInput!) {
									createUser(createUserInput: $createUserInput) {
										id
										email
										role
										createdAt
										updatedAt
									}
								}`,
							variables: {
								createUserInput,
							},
						};
						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(query);

						const errors = response.body.errors;
						const passwordError = errors[0];
						const {extensions} = passwordError;

						expect(response.statusCode).toEqual(HttpStatus.OK);

						expect(errors.length).toEqual(1);

						expect(extensions.code).toEqual(
							ExtensionCodes.BAD_USER_INPUT
						);

						expect(
							extensions.response.message
						).toContain(ErrorMessage.PASSWORD_MIN_LENGTH);
					});
				});
			});
		});
	});
});
