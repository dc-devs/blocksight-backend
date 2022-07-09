import request from 'supertest';
// import { firstUser } from '../../../prisma/seeds/exchanges.seed';
import { INestApplication, HttpStatus } from '@nestjs/common';
import initializeTestApp from '../../helpers/init/initializeTestApp';
import { redisClient } from '../../../src/server/initialize/initialize-redis';
import expectedExchangeObject from './expected-objects/expected-exchange-object';

describe('Exchanges', () => {
	let app: INestApplication;

	beforeAll(async () => {
		app = await initializeTestApp();
	});

	afterAll(async () => {
		await redisClient.disconnect();
		await app.close();
	});

	describe('Find One', () => {
		describe('id', () => {
			describe('when sending a query with an id for an exchange that does exist', () => {
				it('should return exchange', async () => {
					const id = 1;
					const query = {
						operationName: 'Query',
						query: `
							query Query($findOneExchangeInput: FindOneExchangeInput!) {
								findOneExchange(findOneExchangeInput: $findOneExchangeInput) {
									id
									name
									websiteUrl
									logoUrl
									companyLogoUrl
									createdAt
									updatedAt
									users {
									id
									email
									primaryWalletAddress
									role
									createdAt
									updatedAt
									}
								}
							}`,
						variables: {
							findOneExchangeInput: {
								id,
							},
						},
					};

					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(query);

					const exchange = response.body.data.findOneExchange;

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(exchange.id).toEqual(id);
					expect(exchange).toEqual(expectedExchangeObject);
				});
			});

			// 	describe('validation', () => {
			// 		describe('when sending a query with an id for exchange that does not exist', () => {
			// 			it('should return null', async () => {
			// 				const id = 100;
			// 				const query = {
			// 					operationName: 'Query',
			// 					query: `
			// 						query Query($findOneExchangeInput: FindOneUserInput!) {
			// 							findOneExchange(findOneExchangeInput: $findOneExchangeInput) {
			// 								id
			// 								role
			// 								email
			// 								primaryWalletAddress
			// 								updatedAt
			// 								createdAt
			// 							}
			// 						}`,
			// 					variables: {
			// 						findOneExchangeInput: {
			// 							id,
			// 						},
			// 					},
			// 				};

			// 				const response = await request(app.getHttpServer())
			// 					.post('/graphql')
			// 					.send(query);

			// 				const exchange = response.body.data.findOneExchange;

			// 				expect(response.statusCode).toEqual(HttpStatus.OK);
			// 				expect(exchange).toBeNull();
			// 			});
			// 		});
			// 	});
			// });

			// describe('email', () => {
			// 	describe('when sending a query with an email for exchange that does exist', () => {
			// 		it('should return exchange', async () => {
			// 			const email = firstUser.email;
			// 			const query = {
			// 				operationName: 'Query',
			// 				query: `
			// 					query Query($findOneExchangeInput: FindOneUserInput!) {
			// 						findOneExchange(findOneExchangeInput: $findOneExchangeInput) {
			// 							id
			// 							role
			// 							email
			// 							primaryWalletAddress
			// 							createdAt
			// 							updatedAt
			// 						}
			// 					}`,
			// 				variables: {
			// 					findOneExchangeInput: {
			// 						email,
			// 					},
			// 				},
			// 			};
			// 			const response = await request(app.getHttpServer())
			// 				.post('/graphql')
			// 				.send(query);

			// 			const exchange = response.body.data.findOneExchange;

			// 			expect(response.statusCode).toEqual(HttpStatus.OK);
			// 			expect(exchange).toEqual(expectedExchangeObject);
			// 			expect(exchange).not.toHaveProperty(ExchangeProperty.PASSWORD);
			// 		});
			// 	});

			// 	describe('validation', () => {
			// 		describe('when sending a query with an email for exchange that does not exist', () => {
			// 			it('should return null', async () => {
			// 				const email = 'i-dont-exist@gmail.com';
			// 				const query = {
			// 					operationName: 'Query',
			// 					query: `
			// 						query Query($findOneExchangeInput: FindOneUserInput!) {
			// 							findOneExchange(findOneExchangeInput: $findOneExchangeInput) {
			// 								id
			// 								role
			// 								email
			// 								primaryWalletAddress
			// 								createdAt
			// 								updatedAt
			// 							}
			// 						}`,
			// 					variables: {
			// 						findOneExchangeInput: {
			// 							email,
			// 						},
			// 					},
			// 				};

			// 				const response = await request(app.getHttpServer())
			// 					.post('/graphql')
			// 					.send(query);

			// 				const exchange = response.body.data.findOneExchange;

			// 				expect(response.statusCode).toEqual(HttpStatus.OK);
			// 				expect(exchange).toBeNull();
			// 			});
			// 		});
			// 	});
			// });

			// describe('validation', () => {
			// 	describe('when sending a query with no data', () => {
			// 		it('should return null', async () => {
			// 			const query = {
			// 				operationName: 'Query',
			// 				query: `
			// 					query Query($findOneExchangeInput: FindOneUserInput!) {
			// 						findOneExchange(findOneExchangeInput: $findOneExchangeInput) {
			// 							id
			// 							role
			// 							email
			// 							primaryWalletAddress
			// 							createdAt
			// 							updatedAt
			// 						}
			// 					}`,
			// 				variables: {
			// 					findOneExchangeInput: {},
			// 				},
			// 			};

			// 			const response = await request(app.getHttpServer())
			// 				.post('/graphql')
			// 				.send(query);

			// 			const exchange = response.body.data.findOneExchange;

			// 			expect(response.statusCode).toEqual(HttpStatus.OK);
			// 			expect(exchange).toBeNull();
			// 		});
			// 	});
		});
	});
});
