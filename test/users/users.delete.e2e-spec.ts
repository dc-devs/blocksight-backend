import * as request from 'supertest';
import ErrorMessage from './enums/error-message.enum';
import UserProperty from './enums/user-property.enum';
import initializeTestApp from '../helpers/init/initializeTestApp';
import expectedUserObject from './expected-objects/expected-user-object';
import { INestApplication, HttpStatus } from '@nestjs/common';
import GraphQLErrorMessage from '../../src/graphql/errors/error-message.enum';
import ErrorCode from '../../src/prisma/error-code.enum';

describe('Users', () => {
	let app: INestApplication;

	beforeAll(async () => {
		app = await initializeTestApp();
	});

	afterAll(async () => {
		await app.close();
	});

	// Add Tests to create user for unique email constraint
	describe('Delete one', () => {
		describe('when passed a valid user id', () => {
			it('should delete that user', async () => {
				const id = 55;
				const query = {
					operationName: 'Mutation',
					query: `
						mutation Mutation($id: Int!) {
							deleteUser(id: $id) {
								id
								email
								role
								createdAt
								updatedAt
							}
						}`,
					variables: {
						id,
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(query);

				const user = response.body.data.deleteUser;

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(user).toEqual(expectedUserObject);
				expect(user).not.toHaveProperty(UserProperty.PASSWORD);
			});
		});

		describe('when passed an invalid user id', () => {
			it('should delete that user', async () => {
				const id = 100;
				const query = {
					operationName: 'Mutation',
					query: `
						mutation Mutation($id: Int!) {
							deleteUser(id: $id) {
								id
								email
								role
								createdAt
								updatedAt
							}
						}`,
					variables: {
						id,
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

				expect(exception.code).toEqual(ErrorCode.RECORD_NOT_FOUND);

				expect(exception.meta.cause).toContain(
					ErrorMessage.DELETE_RECORD_NOT_FOUND
				);
			});
		});
	});
});
