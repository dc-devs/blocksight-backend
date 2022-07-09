import request from 'supertest';
import UserProperty from './enums/exchange-property.enum';
import { firstUser } from '../../../prisma/seeds/exchanges.seed';
import { INestApplication, HttpStatus } from '@nestjs/common';
import initializeTestApp from '../../helpers/init/initializeTestApp';
import expectedUserObject from './expected-objects/expected-exchange-object';
import { redisClient } from '../../../src/server/initialize/initialize-redis';

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
			describe('when sending a query with an id for exchange that does exist', () => {
				it('should return exchange', async () => {
					const id = 1;
					const query = {
						operationName: 'Query',
						query: `
							query Query($findOneUserInput: FindOneUserInput!) {
								findOneUser(findOneUserInput: $findOneUserInput) {
									id
									role
									email
									primaryWalletAddress
									updatedAt
									createdAt
								}
							}`,
						variables: {
							findOneUserInput: {
								id,
							},
						},
					};

					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(query);

					const exchange = response.body.data.findOneUser;

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(exchange.id).toEqual(id);
					expect(exchange).toEqual(expectedUserObject);
					expect(exchange).not.toHaveProperty(UserProperty.PASSWORD);
				});
			});

			describe('validation', () => {
				describe('when sending a query with an id for exchange that does not exist', () => {
					it('should return null', async () => {
						const id = 100;
						const query = {
							operationName: 'Query',
							query: `
								query Query($findOneUserInput: FindOneUserInput!) {
									findOneUser(findOneUserInput: $findOneUserInput) {
										id
										role
										email
										primaryWalletAddress
										updatedAt
										createdAt
									}
								}`,
							variables: {
								findOneUserInput: {
									id,
								},
							},
						};

						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(query);

						const exchange = response.body.data.findOneUser;

						expect(response.statusCode).toEqual(HttpStatus.OK);
						expect(exchange).toBeNull();
					});
				});
			});
		});

		describe('email', () => {
			describe('when sending a query with an email for exchange that does exist', () => {
				it('should return exchange', async () => {
					const email = firstUser.email;
					const query = {
						operationName: 'Query',
						query: `
							query Query($findOneUserInput: FindOneUserInput!) {
								findOneUser(findOneUserInput: $findOneUserInput) {
									id
									role
									email
									primaryWalletAddress
									createdAt
									updatedAt
								}
							}`,
						variables: {
							findOneUserInput: {
								email,
							},
						},
					};
					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(query);

					const exchange = response.body.data.findOneUser;

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(exchange).toEqual(expectedUserObject);
					expect(exchange).not.toHaveProperty(UserProperty.PASSWORD);
				});
			});

			describe('validation', () => {
				describe('when sending a query with an email for exchange that does not exist', () => {
					it('should return null', async () => {
						const email = 'i-dont-exist@gmail.com';
						const query = {
							operationName: 'Query',
							query: `
								query Query($findOneUserInput: FindOneUserInput!) {
									findOneUser(findOneUserInput: $findOneUserInput) {
										id
										role
										email
										primaryWalletAddress
										createdAt
										updatedAt
									}
								}`,
							variables: {
								findOneUserInput: {
									email,
								},
							},
						};

						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(query);

						const exchange = response.body.data.findOneUser;

						expect(response.statusCode).toEqual(HttpStatus.OK);
						expect(exchange).toBeNull();
					});
				});
			});
		});

		describe('validation', () => {
			describe('when sending a query with no data', () => {
				it('should return null', async () => {
					const query = {
						operationName: 'Query',
						query: `
							query Query($findOneUserInput: FindOneUserInput!) {
								findOneUser(findOneUserInput: $findOneUserInput) {
									id
									role
									email
									primaryWalletAddress
									createdAt
									updatedAt
								}
							}`,
						variables: {
							findOneUserInput: {},
						},
					};

					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(query);

					const exchange = response.body.data.findOneUser;

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(exchange).toBeNull();
				});
			});
		});
	});
});
