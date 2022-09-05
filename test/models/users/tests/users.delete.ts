import request from 'supertest';
import query from '../queries/delete.query';
import ErrorMessage from '../enums/error-message.enum';
import UserProperty from '../enums/user-property.enum';
import { INestApplication, HttpStatus } from '@nestjs/common';
import ErrorCode from '../../../../src/prisma/error-code.enum';
import {
	testApp,
	initializeTestApp,
} from '../../../helpers/init/initializeTestApp';
import expectedUserObject from '../expected-objects/expected-user-object';
import GraphQLErrorMessage from '../../../../src/graphql/errors/error-message.enum';

const runDeleteTests = () => {
	describe('Delete', () => {
		let app: INestApplication;

		beforeAll(async () => {
			if (testApp) {
				app = testApp;
			} else {
				app = await initializeTestApp();
			}
		});

		describe('when deleting with a valid user id', () => {
			it('should delete that user', async () => {
				const id = 55;
				const graphQlquery = {
					operationName: 'Mutation',
					query,
					variables: {
						id,
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(graphQlquery);

				const user = response.body.data.deleteUser;

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(user).toEqual(expectedUserObject);
				expect(user).not.toHaveProperty(UserProperty.PASSWORD);
			});
		});

		describe('validation', () => {
			describe('when deleting with an invalid user id', () => {
				it('should delete that user', async () => {
					const id = 100;
					const graphQlquery = {
						operationName: 'Mutation',
						query,
						variables: {
							id,
						},
					};
					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(graphQlquery);

					const errors = response.body.errors;
					const prismaError = errors[0];
					const exception = prismaError.extensions.exception;

					expect(errors.length).toEqual(1);

					expect(prismaError.message).toContain(
						GraphQLErrorMessage.DATABASE_ERROR,
					);

					expect(exception.code).toEqual(ErrorCode.RECORD_NOT_FOUND);

					expect(exception.meta.cause).toContain(
						ErrorMessage.DELETE_RECORD_NOT_FOUND,
					);
				});
			});
		});
	});
};

export default runDeleteTests;
