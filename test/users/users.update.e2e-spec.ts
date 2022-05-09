import * as request from 'supertest';
import { UserRole } from '@prisma/client';
import UserProperty from './enums/user-property.enum';
import ErrorMessage from './enums/error-message.enum';
import ErrorCode from '../../src/prisma/error-code.enum';
import { INestApplication, HttpStatus } from '@nestjs/common';
import initializeTestApp from '../helpers/init/initializeTestApp';
import ExtensionCode from '../../src/graphql/errors/extension-code.enum';
import GraphQLErrorMessage from '../../src/graphql/errors/error-message.enum';

describe('Users', () => {
	let app: INestApplication;

	beforeAll(async () => {
		app = await initializeTestApp();
	});

	afterAll(async () => {
		await app.close();
	});

	describe('Update', () => {
		describe('when sending a valid user id and invalid udpate data', () => {
			let updateUserInput;

			beforeEach(() => {
				updateUserInput = {
					email: 'test-test-1@gmail.com',
					role: 'ADMIN',
					password: '12345678',
				};
			});

			it('should return a error', async () => {
				const id = 1;
				const query = {
					operationName: 'Mutation',
					query: `
						mutation Mutation($id: Int!, $data: UpdateUserInput!) {
  							updateUser(id: $id, updateUserInput: $data) {
								id
								email
								role
								createdAt
								updatedAt
							}
						}`,
					variables: {
						id,
						data: updateUserInput,
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(query);

				const errors = response.body.errors;
				const roleError = errors[0];
				const passwordError = errors[1];

				expect(errors.length).toEqual(2);

				errors.forEach((error) => {
					expect(error.extensions.code).toEqual(
						ExtensionCode.BAD_USER_INPUT
					);
				});

				expect(roleError.message).toContain(
					ErrorMessage.ROLE_FIELD_NOT_DEFINED
				);

				expect(passwordError.message).toContain(
					ErrorMessage.PASSWORD_FIELD_NOT_DEFINED
				);
			});
		});

		describe('when sending an invalid user id and valid udpate data', () => {
			let updateUserInput;

			beforeEach(() => {
				updateUserInput = {
					email: 'test-test-1@gmail.com',
				};
			});

			it('should return a error', async () => {
				const id = 100;
				const query = {
					operationName: 'Mutation',
					query: `
						mutation Mutation($id: Int!, $data: UpdateUserInput!) {
  							updateUser(id: $id, updateUserInput: $data) {
								id
								email
								role
								createdAt
								updatedAt
							}
						}`,
					variables: {
						id,
						data: updateUserInput,
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(query);

				const errors = response.body.errors;
				const prismaError = errors[0];
				const exception = prismaError.extensions.exception;

				expect(errors.length).toEqual(1);

				expect(prismaError.message).toContain(
					GraphQLErrorMessage.DATABASE_ERROR
				);
				expect(exception.meta.cause).toContain(
					ErrorMessage.UPDATE_RECORD_NOT_FOUND
				);
			});
		});

		describe('when sending a valid user id and udpate data', () => {
			describe('and the email is not unique', () => {
				let updateUserInput;

				beforeEach(() => {
					updateUserInput = {
						email: 'davidc@prisma.io',
					};
				});

				it('should return an error', async () => {
					const id = 20;
					const query = {
						operationName: 'Mutation',
						query: `
						mutation Mutation($id: Int!, $data: UpdateUserInput!) {
  							updateUser(id: $id, updateUserInput: $data) {
								id
								email
								role
								createdAt
								updatedAt
							}
						}`,
						variables: {
							id,
							data: updateUserInput,
						},
					};
					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(query);

					const errors = response.body.errors;
					const prismaError = errors[0];
					const exception = prismaError.extensions.exception;

					expect(errors.length).toEqual(1);

					expect(prismaError.message).toEqual(
						GraphQLErrorMessage.DATABASE_ERROR
					);
					expect(exception.code).toEqual(ErrorCode.UNIQUE_CONSTRAINT);
					expect(exception.meta.target[0]).toEqual(
						UserProperty.EMAIL
					);
				});
			});

			describe('and the email is unique', () => {
				let updateUserInput;

				beforeEach(() => {
					updateUserInput = {
						email: 'test-test-1@gmail.com',
					};
				});

				it('should update user', async () => {
					const id = 20;
					const expectedUserResponse = expect.objectContaining({
						id,
						...updateUserInput,
						role: UserRole.USER,
						createdAt: expect.any(String),
						updatedAt: expect.any(String),
					});
					const query = {
						operationName: 'Mutation',
						query: `
						mutation Mutation($id: Int!, $data: UpdateUserInput!) {
  							updateUser(id: $id, updateUserInput: $data) {
								id
								email
								role
								createdAt
								updatedAt
							}
						}`,
						variables: {
							id,
							data: updateUserInput,
						},
					};
					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(query);

					const user = response.body.data.updateUser;

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(user).toEqual(expectedUserResponse);
					expect(user).not.toHaveProperty(UserProperty.PASSWORD);
				});
			});
		});
	});
});
