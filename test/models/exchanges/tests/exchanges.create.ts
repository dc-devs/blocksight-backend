import request from 'supertest';
import query from '../queries/create.query';
import ErrorMessage from '../enums/error-message.enum';
import ErrorCode from '../../../../src/prisma/error-code.enum';
import { INestApplication, HttpStatus } from '@nestjs/common';
import initializeTestApp from '../../../helpers/init/initializeTestApp';
import { allExchangesCount } from '../../../../prisma/seeds/exchanges.seed';
import expectedExchangeObject from '../expected-objects/expected-exchange-object';
import { redisClient } from '../../../../src/server/initialize/initialize-redis';
import GraphQLErrorMessage from '../../../../src/graphql/errors/error-message.enum';

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

		describe('when creating a new exchange', () => {
			const createExchangeInput = {
				name: 'New Exchnage',
				websiteUrl: 'https://new-exchange.com/',
				logoUrl: 'https://new-exchange.com/logo',
				companyLogoUrl: 'https://new-exchange.com/company-logo',
				hasApi: true,
				hasCsv: true,
			};

			it('should create and return that exchange', async () => {
				const graphqlQuery = {
					operationName: 'Mutation',
					query,
					variables: {
						createExchangeInput,
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(graphqlQuery);

				console.log(response);

				const exchange = response.body.data.createExchange;

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(exchange).toEqual(expectedExchangeObject);
			});
		});
	});
};

export default runCreateTests;
