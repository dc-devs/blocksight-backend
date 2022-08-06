import request from 'supertest';
import query from '../queries/find-all.query';
import { INestApplication, HttpStatus } from '@nestjs/common';
import initializeTestApp from '../../../helpers/init/initializeTestApp';
import { allModelsCount } from '../../../../prisma/seeds/users-exchanges.seed';
import expectedUsersExchangesObject from '../expected-objects/expected-users-exchanges-object';
import { redisClient } from '../../../../src/server/initialize/initialize-redis';

const runUpdateTests = () => {
	describe('Update', () => {
		let app: INestApplication;

		beforeAll(async () => {
			app = await initializeTestApp();
		});

		afterAll(async () => {
			await redisClient.disconnect();
			await app.close();
		});

		describe('when querying to get all UsersExchanges', () => {
			it('should return all UsersExchanges', async () => {
				const graphQlquery = {
					operationName: 'Query',
					query,
					variables: {
						findAllUsersExchangesInput: {},
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(graphQlquery);

				const usersExchanges = response.body.data.findAllUsersExchanges;

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(usersExchanges.length).toEqual(allModelsCount);

				usersExchanges.forEach((usersExchanges) => {
					expect(usersExchanges).toEqual(
						expectedUsersExchangesObject,
					);
				});
			});
		});

		describe('where', () => {
			describe(`when querying and the where argument aims to fetch UsersExchanges with 'userId: 1'`, () => {
				it('should return all UsersExchanges with that userId', async () => {
					const graphQlquery = {
						operationName: 'Query',
						query,
						variables: {
							findAllUsersExchangesInput: {
								where: {
									userId: 1,
								},
							},
						},
					};

					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(graphQlquery);

					const usersExchanges =
						response.body.data.findAllUsersExchanges;

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(usersExchanges).toHaveLength(4);

					usersExchanges.forEach((usersExchanges) => {
						expect(usersExchanges).toEqual(
							expectedUsersExchangesObject,
						);
						expect(usersExchanges.userId).toEqual(1);
					});
				});
			});

			describe(`when querying and the where NOT argument aims to fetch UsersExchanges with 'userId: 1'' and not 'exchangeId: 3'`, () => {
				it('should return all UsersExchanges with that combination', async () => {
					const graphQlquery = {
						operationName: 'Query',
						query,
						variables: {
							findAllUsersExchangesInput: {
								where: {
									userId: 1,
									NOT: [{ exchangeId: 3 }],
								},
							},
						},
					};

					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(graphQlquery);

					const usersExchanges =
						response.body.data.findAllUsersExchanges;
					const usersExchange = usersExchanges[0];

					expect(response.statusCode).toEqual(HttpStatus.OK);

					expect(usersExchanges).toHaveLength(3);

					expect(usersExchange).toEqual(expectedUsersExchangesObject);
					expect(usersExchange.userId).toEqual(1);
				});
			});

			describe(`when querying and the where OR argument aims to fetch UsersExchanges with 'userId: 1' or 'exchangeId: 4'`, () => {
				it('should return all UsersExchanges with that combination', async () => {
					const graphQlquery = {
						operationName: 'Query',
						query,
						variables: {
							findAllUsersExchangesInput: {
								where: {
									OR: [{ exchangeId: 4 }, { userId: 1 }],
								},
							},
						},
					};

					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(graphQlquery);

					const usersExchanges =
						response.body.data.findAllUsersExchanges;

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(usersExchanges.length).toBe(4);

					usersExchanges.forEach((usersExchanges) => {
						expect(usersExchanges).toEqual(
							expectedUsersExchangesObject,
						);
					});
				});
			});
		});

		describe('pagination', () => {
			describe('when querying and the skip and take arguments are used to implement pagination', () => {
				describe('and the skip param is 1, and the take param is 2', () => {
					it('should return the first 2 UsersExchanges', async () => {
						const skip = 1;
						const take = 2;
						const graphQlquery = {
							operationName: 'Query',
							query,
							variables: {
								findAllUsersExchangesInput: {
									skip,
									take,
								},
							},
						};
						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(graphQlquery);

						const usersExchanges =
							response.body.data.findAllUsersExchanges;

						expect(response.statusCode).toEqual(HttpStatus.OK);
						expect(usersExchanges).toHaveLength(take);

						usersExchanges.forEach((exchange) => {
							expect(exchange).toEqual(
								expectedUsersExchangesObject,
							);
						});

						const lastUsersExchanges =
							usersExchanges[usersExchanges.length - 1];
						const lastUsersExchangesId = skip + take;
						expect(lastUsersExchanges.id).toEqual(
							lastUsersExchangesId,
						);
					});
				});
			});

			describe('when querying and the cursor and take arguments are used to implement pagination', () => {
				describe('and the cursor param is {"id":1}, and the take param is 2', () => {
					it('should return the first 2 UsersExchanges', async () => {
						const cursor = { id: 1 };
						const take = 2;
						const graphQlquery = {
							operationName: 'Query',
							query,
							variables: {
								findAllUsersExchangesInput: {
									cursor,
									take,
								},
							},
						};

						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(graphQlquery);

						const usersExchanges =
							response.body.data.findAllUsersExchanges;

						expect(response.statusCode).toEqual(HttpStatus.OK);
						expect(usersExchanges).toHaveLength(take);

						usersExchanges.forEach((usersExchanges) => {
							expect(usersExchanges).toEqual(
								expectedUsersExchangesObject,
							);
						});

						const lastUsersExchanges =
							usersExchanges[usersExchanges.length - 1];
						const lastUsersExchangesId = cursor.id + take - 1;
						expect(lastUsersExchanges.id).toEqual(
							lastUsersExchangesId,
						);
					});
				});
			});
		});
	});
};

export default runUpdateTests;
