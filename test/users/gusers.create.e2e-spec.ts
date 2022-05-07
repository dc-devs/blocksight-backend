import * as request from 'supertest';
import { UserRole } from '@prisma/client';
import ErrorMessage from './enums/error-message.enum';
import UserProperty from './enums/user-property.enum';
import initializeTestApp from '../init/initializeTestApp';
import { INestApplication, HttpStatus } from '@nestjs/common';
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
		describe('when sending an email and a password', () => {
			let newUser;

			beforeEach(() => {
				newUser = {
					email: 'test-1@gmail.com',
					password: '12345678',
				};
			});

			it('should create a new user', async () => {
				const expectedUserResponse = expect.objectContaining({
					email: 'test-1@gmail.com',
					role: UserRole.USER,
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
				});
				const query = {
					operationName: 'Mutation',
					query: `
						mutation Mutation($createGuserInput: CreateGuserInput!) {
							createGuser(createGuserInput: $createGuserInput) {
								id
								email
								role
								createdAt
								updatedAt
							}
						}`,
					variables: {
						createGuserInput: newUser,
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(query);

				const user = response.body.data.createGuser;

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(user).toEqual(expectedUserResponse);
				expect(user).not.toHaveProperty(UserProperty.PASSWORD);
			});
		});

		describe('when sending no data', () => {
			let newUser;

			beforeEach(() => {
				newUser = {};
			});

			it('should return an error', async () => {
				const query = {
					operationName: 'Mutation',
					query: `
						mutation Mutation($createGuserInput: CreateGuserInput!) {
							createGuser(createGuserInput: $createGuserInput) {
								id
								email
								role
								createdAt
								updatedAt
							}
						}`,
					variables: {
						createGuserInput: newUser,
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

		describe('when sending only email', () => {
			let newUser;

			beforeEach(() => {
				newUser = {
					email: 'david-test-2@gmail.com',
				};
			});

			it('should return an error', async () => {
				const query = {
					operationName: 'Mutation',
					query: `
						mutation Mutation($createGuserInput: CreateGuserInput!) {
							createGuser(createGuserInput: $createGuserInput) {
								id
								email
								role
								createdAt
								updatedAt
							}
						}`,
					variables: {
						createGuserInput: newUser,
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(query);

				const errors = response.body.errors;
				const passwordError = errors[0];

				expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);

				expect(errors.length).toEqual(1);

				expect(passwordError.extensions.code).toEqual(
					ExtensionCodes.BAD_USER_INPUT
				);

				expect(passwordError.message).toContain(
					ErrorMessage.PASSWORD_REQUIRED
				);
			});
		});

		describe('when sending an email that is not an email', () => {
			let newUser;

			beforeEach(() => {
				newUser = {
					email: 'david-test-2',
					password: '123456789',
				};
			});

			it('should return an error', async () => {
				const query = {
					operationName: 'Mutation',
					query: `
						mutation Mutation($createGuserInput: CreateGuserInput!) {
							createGuser(createGuserInput: $createGuserInput) {
								id
								email
								role
								createdAt
								updatedAt
							}
						}`,
					variables: {
						createGuserInput: newUser,
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(query);

				const errors = response.body.errors;
				const emailError = errors[0];

				expect(response.statusCode).toEqual(HttpStatus.OK);

				expect(errors.length).toEqual(1);

				expect(emailError.extensions.code).toEqual(
					ExtensionCodes.BAD_USER_INPUT
				);

				expect(emailError.extensions.response.message).toContain(
					ErrorMessage.EMAIL_IS_EMAIL
				);
			});
		});

		describe('when sending only password', () => {
			let newUser;

			beforeEach(() => {
				newUser = {
					password: '123456789',
				};
			});

			it('should return an error', async () => {
				const query = {
					operationName: 'Mutation',
					query: `
						mutation Mutation($createGuserInput: CreateGuserInput!) {
							createGuser(createGuserInput: $createGuserInput) {
								id
								email
								role
								createdAt
								updatedAt
							}
						}`,
					variables: {
						createGuserInput: newUser,
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(query);

				const errors = response.body.errors;
				const emailError = errors[0];

				expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);

				expect(errors.length).toEqual(1);

				expect(emailError.extensions.code).toEqual(
					ExtensionCodes.BAD_USER_INPUT
				);

				expect(emailError.message).toContain(
					ErrorMessage.EMAIL_REQUIRED
				);
			});
		});

		describe('when sending a password that is not long enough', () => {
			let newUser;

			beforeEach(() => {
				newUser = {
					email: 'david-test-2@gmail.com',
					password: '1234567',
				};
			});

			it('should return an error', async () => {
				const query = {
					operationName: 'Mutation',
					query: `
						mutation Mutation($createGuserInput: CreateGuserInput!) {
							createGuser(createGuserInput: $createGuserInput) {
								id
								email
								role
								createdAt
								updatedAt
							}
						}`,
					variables: {
						createGuserInput: newUser,
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(query);

				const errors = response.body.errors;
				const emailError = errors[0];

				expect(response.statusCode).toEqual(HttpStatus.OK);

				expect(errors.length).toEqual(1);

				expect(emailError.extensions.code).toEqual(
					ExtensionCodes.BAD_USER_INPUT
				);

				expect(emailError.extensions.response.message).toContain(
					ErrorMessage.PASSWORD_MIN_LENGTH
				);
			});
		});
	});
});
