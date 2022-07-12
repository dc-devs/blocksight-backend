import request from 'supertest';
import query from '../queries/delete.query';
import ErrorMessage from '../enums/error-message.enum';
import ErrorCode from '../../../../src/prisma/error-code.enum';
import { INestApplication, HttpStatus } from '@nestjs/common';
import initializeTestApp from '../../../helpers/init/initializeTestApp';
import { allExchangesCount } from '../../../../prisma/seeds/exchanges.seed';
import expectedUserObject from '../expected-objects/expected-exchange-object';
import { redisClient } from '../../../../src/server/initialize/initialize-redis';
import GraphQLErrorMessage from '../../../../src/graphql/errors/error-message.enum';

const runDeleteTests = () => {
	describe('Delete One', () => {
		let app: INestApplication;

		beforeAll(async () => {
			app = await initializeTestApp();
		});

		afterAll(async () => {
			await redisClient.disconnect();
			await app.close();
		});

		describe('when sending a valid exchnage id', () => {
			it('should delete that exchnage', async () => {
				const id = allExchangesCount;
				const graphqlQuery = {
					operationName: 'Mutation',
					query,
					variables: {
						id,
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(graphqlQuery);

				const exchnage = response.body.data.deleteExchange;

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(exchnage).toEqual(expectedUserObject);
			});
		});

		describe('validation', () => {
			describe('when sending an invalid exchnage id', () => {
				it('should delete that exchnage', async () => {
					const id = 100;
					const graphqlQuery = {
						operationName: 'Mutation',
						query,
						variables: {
							id,
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
