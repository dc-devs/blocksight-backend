import request from 'supertest';
import query from '../queries/find-one-query';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { ExchangeName } from '../../../../src/models/exchanges/enums';
import {
	testApp,
	initializeTestApp,
} from '../../../helpers/init/initializeTestApp';
import expectedExchangeObject from '../expected-objects/expected-exchange-object-with-relation';

const runFindOneTests = () => {
	describe('Find One', () => {
		let app: INestApplication;

		beforeAll(async () => {
			if (testApp) {
				app = testApp;
			} else {
				app = await initializeTestApp();
			}
		});

		describe('id', () => {
			describe('when querying with an id for an exchange that does exist', () => {
				it('should return exchange', async () => {
					const id = 1;
					const graphQlquery = {
						operationName: 'Query',
						query,
						variables: {
							findOneExchangeInput: {
								id,
							},
						},
					};

					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(graphQlquery);

					const exchange = response.body.data.findOneExchange;

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(exchange.id).toEqual(id);
					expect(exchange).toEqual(expectedExchangeObject);
				});
			});

			describe('validation', () => {
				describe('when querying with an id for exchange that does not exist', () => {
					it('should return null', async () => {
						const id = 100;
						const graphQlquery = {
							operationName: 'Query',
							query,
							variables: {
								findOneExchangeInput: {
									id,
								},
							},
						};

						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(graphQlquery);

						const exchange = response.body.data.findOneExchange;

						expect(response.statusCode).toEqual(HttpStatus.OK);
						expect(exchange).toBeNull();
					});
				});
			});
		});

		describe('name', () => {
			describe('when querying with an name for an exchange that does exist', () => {
				it('should return exchange', async () => {
					const name = ExchangeName.COINBASE;
					const graphQlquery = {
						operationName: 'Query',
						query,
						variables: {
							findOneExchangeInput: {
								name,
							},
						},
					};

					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(graphQlquery);

					const exchange = response.body.data.findOneExchange;

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(exchange.name).toEqual(name);
					expect(exchange).toEqual(expectedExchangeObject);
				});
			});

			describe('validation', () => {
				describe('when querying with an name for exchange that does not exist', () => {
					it('should return null', async () => {
						const name = 'non-existent-company';
						const graphQlquery = {
							operationName: 'Query',
							query,
							variables: {
								findOneExchangeInput: {
									name,
								},
							},
						};

						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(graphQlquery);

						const exchange = response.body.data.findOneExchange;

						expect(response.statusCode).toEqual(HttpStatus.OK);
						expect(exchange).toBeNull();
					});
				});
			});
		});

		describe('validation', () => {
			describe('when querying with no data', () => {
				it('should return null', async () => {
					const graphQlquery = {
						operationName: 'Query',
						query,
						variables: {
							findOneExchangeInput: {},
						},
					};

					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(graphQlquery);

					const exchange = response.body.data.findOneExchange;

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(exchange).toBeNull();
				});
			});
		});
	});
};

export default runFindOneTests;
