import request from 'supertest';
import query from '../queries/find-all-query';
import { INestApplication, HttpStatus } from '@nestjs/common';
import {
	testApp,
	initializeTestApp,
} from '../../../helpers/init/initializeTestApp';
import { allExchangesCount } from '../../../../prisma/seeds/exchanges.seed';
import expectedExchangeObject from '../expected-objects/expected-exchange-object-with-empty-relation';
import {
	ExchangeName,
	ExchangeWebsite,
} from '../../../../src/models/exchanges/enums';

const runFindAllTests = () => {
	describe('Find All', () => {
		let app: INestApplication;

		beforeAll(async () => {
			if (testApp) {
				app = testApp;
			} else {
				app = await initializeTestApp();
			}
		});

		describe('when querying to get all exchanges', () => {
			it('should return all exchanges', async () => {
				const graphQlquery = {
					operationName: 'Query',
					query,
					variables: {
						findAllExchangesInput: {},
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(graphQlquery);

				const exchanges = response.body.data.findAllExchanges;

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(exchanges.length).toEqual(allExchangesCount);

				exchanges.forEach((exchange) => {
					expect(exchange).toEqual(expectedExchangeObject);
				});
			});
		});

		describe('when querying with arguments', () => {
			describe('where', () => {
				describe(`and the where argument aims to fetch exchanges with 'name: ${ExchangeName.COINBASE}'`, () => {
					it('should return all exchanges with that name', async () => {
						const graphQlquery = {
							operationName: 'Query',
							query,
							variables: {
								findAllExchangesInput: {
									where: {
										name: ExchangeName.COINBASE,
									},
								},
							},
						};

						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(graphQlquery);

						const exchanges = response.body.data.findAllExchanges;

						expect(response.statusCode).toEqual(HttpStatus.OK);
						expect(exchanges).toHaveLength(1);

						exchanges.forEach((exchange) => {
							expect(exchange).toEqual(expectedExchangeObject);
							expect(exchange.name).toEqual(
								ExchangeName.COINBASE,
							);
						});
					});
				});

				describe(`and the AND argument aims to fetch exchanges with 'name: ${ExchangeName.COINBASE}' and has an api`, () => {
					it('should return all exchanges with that combination', async () => {
						const graphQlquery = {
							operationName: 'Query',
							query,
							variables: {
								findAllExchangesInput: {
									where: {
										name: ExchangeName.COINBASE,
										AND: [
											{
												hasApi: true,
											},
										],
									},
								},
							},
						};

						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(graphQlquery);

						const exchanges = response.body.data.findAllExchanges;
						const exchange = exchanges[0];

						expect(response.statusCode).toEqual(HttpStatus.OK);

						expect(exchanges).toHaveLength(1);

						expect(exchange).toEqual(expectedExchangeObject);
						expect(exchange.name).toEqual(ExchangeName.COINBASE);
						expect(exchange.websiteUrl).toEqual(
							ExchangeWebsite.COINBASE,
						);
					});
				});

				describe(`and the where NOT argument aims to fetch one exchanges with 'name: ${ExchangeName.CRYPTO_COM}' and has no api`, () => {
					it('should return all exchanges with that combination', async () => {
						const graphQlquery = {
							operationName: 'Query',
							query,
							variables: {
								findAllExchangesInput: {
									where: {
										name: ExchangeName.CRYPTO_COM,
										NOT: [{ hasApi: true }],
									},
								},
							},
						};

						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(graphQlquery);

						const exchanges = response.body.data.findAllExchanges;
						const exchange = exchanges[0];

						expect(response.statusCode).toEqual(HttpStatus.OK);

						expect(exchanges).toHaveLength(1);

						expect(exchange).toEqual(expectedExchangeObject);
						expect(exchange.name).toEqual(ExchangeName.CRYPTO_COM);
					});
				});

				describe('and the where OR argument aims to fetch one exchanges has does and does not have apis ', () => {
					it('should return all exchanges with that combination', async () => {
						const graphQlquery = {
							operationName: 'Query',
							query,
							variables: {
								findAllExchangesInput: {
									where: {
										OR: [
											{ hasApi: true },
											{ hasApi: false },
										],
									},
								},
							},
						};

						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(graphQlquery);

						const exchanges = response.body.data.findAllExchanges;

						expect(response.statusCode).toEqual(HttpStatus.OK);
						expect(exchanges.length <= allExchangesCount).toBe(
							true,
						);

						exchanges.forEach((exchange) => {
							expect(exchange).toEqual(expectedExchangeObject);
						});
					});
				});
			});

			describe('pagination', () => {
				describe('and the skip and take arguments are used to implement pagination', () => {
					describe('and the skip param is 10, and the take param is 10', () => {
						it('should return the first 10 exchanges', async () => {
							const skip = 1;
							const take = 2;
							const graphQlquery = {
								operationName: 'Query',
								query,
								variables: {
									findAllExchangesInput: {
										skip,
										take,
									},
								},
							};
							const response = await request(app.getHttpServer())
								.post('/graphql')
								.send(graphQlquery);

							const exchanges =
								response.body.data.findAllExchanges;

							expect(response.statusCode).toEqual(HttpStatus.OK);
							expect(exchanges).toHaveLength(take);

							exchanges.forEach((exchange) => {
								expect(exchange).toEqual(
									expectedExchangeObject,
								);
							});

							const lastExchange =
								exchanges[exchanges.length - 1];
							const lastExchangeId = skip + take;
							expect(lastExchange.id).toEqual(lastExchangeId);
						});
					});
				});

				describe('and the cursor and take arguments are used to implement pagination', () => {
					describe('and the cursor param is id:1, and the take param is 2', () => {
						it('should return the first 2 exchanges', async () => {
							const cursor = { id: 1 };
							const take = 2;
							const graphQlquery = {
								operationName: 'Query',
								query,
								variables: {
									findAllExchangesInput: {
										cursor,
										take,
									},
								},
							};

							const response = await request(app.getHttpServer())
								.post('/graphql')
								.send(graphQlquery);

							const exchanges =
								response.body.data.findAllExchanges;

							expect(response.statusCode).toEqual(HttpStatus.OK);
							expect(exchanges).toHaveLength(take);

							exchanges.forEach((exchange) => {
								expect(exchange).toEqual(
									expectedExchangeObject,
								);
							});

							const lastExchange =
								exchanges[exchanges.length - 1];
							const lastExchangeId = cursor.id + take - 1;
							expect(lastExchange.id).toEqual(lastExchangeId);
						});
					});
				});
			});
		});
	});
};

export default runFindAllTests;
