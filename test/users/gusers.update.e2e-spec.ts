import * as request from 'supertest';
import ErrorMessages from './enums/error-messages.enum';
import UserProperties from './enums/user-properties.enum';
import initializeTestApp from '../init/initializeTestApp';
import { INestApplication, HttpStatus } from '@nestjs/common';
import ExtensionCodes from '../helpers/enums/extension-codes.enum';
import { UserRole } from '@prisma/client';

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
						mutation Mutation($id: Int!, $data: UpdateGuserInput!) {
  							updateGuser(id: $id, updateGuserInput: $data) {
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
						ExtensionCodes.BAD_USER_INPUT
					);
				});

				expect(roleError.message).toContain(
					ErrorMessages.ROLE_FIELD_NOT_DEFINED
				);

				expect(passwordError.message).toContain(
					ErrorMessages.PASSWORD_FIELD_NOT_DEFINED
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
						mutation Mutation($id: Int!, $data: UpdateGuserInput!) {
  							updateGuser(id: $id, updateGuserInput: $data) {
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

				expect(errors.length).toEqual(1);

				expect(prismaError.message).toContain(
					ErrorMessages.PRISMA_ERROR
				);
				expect(prismaError.extensions.exception.meta.cause).toContain(
					ErrorMessages.RECORD_NOT_FOUND
				);
			});
		});

		describe('when sending a valid user id and udpate data', () => {
			let updateUserInput;

			beforeEach(() => {
				updateUserInput = {
					email: 'test-test-1@gmail.com',
				};
			});

			it('should update user', async () => {
				const id = 1;
				const expectedUserResponse = expect.objectContaining({
					id,
					...updateUserInput,
					role: UserRole.SUPER_ADMIN,
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
				});
				const query = {
					operationName: 'Mutation',
					query: `
						mutation Mutation($id: Int!, $data: UpdateGuserInput!) {
  							updateGuser(id: $id, updateGuserInput: $data) {
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

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(response.body.data.updateGuser).toEqual(
					expectedUserResponse
				);
			});
		});
	});
});
