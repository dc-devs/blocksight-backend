import request from 'supertest';
import query from '../queries/create.query';
import ErrorMessage from '../enums/error-message.enum';
import { INestApplication, HttpStatus } from '@nestjs/common';
import initializeTestApp from '../../../helpers/init/initializeTestApp';
import { firstRecord } from '../../../../prisma/seeds/users-exchanges.seed';
import ExtensionCode from '../../../../src/graphql/errors/extension-code.enum';
import { redisClient } from '../../../../src/server/initialize/initialize-redis';
import { UsersExchangesValidationError } from '../../../../src/models/users-exchanges/enums';
import expectedUsersExchangesObject from '../expected-objects/expected-users-exchanges-object';

const runCreateTests = () => {
	describe('Create', () => {
		let app: INestApplication;

		beforeAll(async () => {
			app = await initializeTestApp();
		});

		afterAll(async () => {
			await redisClient.disconnect();
			await app.close();
		});

		describe('when creating a new UsersExchanges with valid inputs', () => {
			const createUsersExchangesInput = {
				userId: 1,
				exchangeId: 1,
			};

			it('should create and return UsersExchanges', async () => {
				const graphqlQuery = {
					operationName: 'Mutation',
					query,
					variables: {
						createUsersExchangesInput,
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(graphqlQuery);

				const usersExchanges = response.body.data.createUsersExchanges;

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(usersExchanges).toEqual(expectedUsersExchangesObject);
			});
		});

		describe('validation', () => {
			describe('when creating with no data', () => {
				let createUsersExchangesInput;
				let errorResponseMessage: string[];

				beforeEach(() => {
					createUsersExchangesInput = {};
					errorResponseMessage = [
						ErrorMessage.USER_ID_MUST_BE_A_NUMBER,
						ErrorMessage.EXCHANGE_ID_MUST_BE_A_NUMBER,
					];
				});

				it('should return an error', async () => {
					const graphqlQuery = {
						operationName: 'Mutation',
						query,
						variables: {
							createUsersExchangesInput,
						},
					};

					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(graphqlQuery);

					const errors = response.body.errors;
					const error = errors[0];
					const { extensions } = error;
					const { code, response: errorResponse } = extensions;

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(errors.length).toEqual(1);

					expect(code).toEqual(ExtensionCode.BAD_USER_INPUT);

					expect(errorResponse.message).toEqual(
						expect.arrayContaining(errorResponseMessage),
					);
				});
			});
		});
	});
};

export default runCreateTests;
