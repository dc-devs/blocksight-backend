import request from 'supertest';
import query from '../queries/delete.query';
import ErrorMessage from '../enums/error-message.enum';
import ErrorCode from '../../../../src/prisma/error-code.enum';
import { INestApplication, HttpStatus } from '@nestjs/common';
import {
	testApp,
	initializeTestApp,
} from '../../../helpers/init/initializeTestApp';
import { allModelsCount } from '../../../../prisma/seeds/users-exchanges.seed';
import expectedUsersExchangesObject from '../expected-objects/expected-users-exchanges-object';
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

		describe('when deleting with a valid UsersExchanges id', () => {
			it('should delete that UsersExchanges', async () => {
				const id = allModelsCount;
				const graphqlQuery = {
					operationName: 'Mutation',
					query,
					variables: {
						deleteUsersExchangesInput: id,
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(graphqlQuery);

				const usersExchanges = response.body.data.deleteUsersExchanges;

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(usersExchanges).toEqual(expectedUsersExchangesObject);
			});
		});

		describe('validation', () => {
			describe('when deleting with an invalid exchange id', () => {
				it('should delete that exchange', async () => {
					const id = 100;
					const graphqlQuery = {
						operationName: 'Mutation',
						query,
						variables: {
							deleteUsersExchangesInput: id,
						},
					};
					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(graphqlQuery);

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
