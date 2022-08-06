import request from 'supertest';
import query from '../queries/find-all.query';
import ErrorMessage from '../enums/error-message.enum';
import { INestApplication, HttpStatus } from '@nestjs/common';
import initializeTestApp from '../../../helpers/init/initializeTestApp';
import { allModelsCount } from '../../../../prisma/seeds/users-exchanges.seed';
import ExtensionCode from '../../../../src/graphql/errors/extension-code.enum';
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

		describe(`and the where argument aims to fetch UsersExchanges with 'userId: 1'`, () => {
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

				const usersExchanges = response.body.data.findAllUsersExchanges;

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

		describe(`and the where NOT argument aims to fetch UsersExchanges with 'userId: 1'' and not 'exchangeId: 3'`, () => {
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
				console.log(response.body);
				const usersExchanges = response.body.data.findAllUsersExchanges;
				const usersExchange = usersExchanges[0];

				expect(response.statusCode).toEqual(HttpStatus.OK);

				expect(usersExchanges).toHaveLength(3);

				expect(usersExchange).toEqual(expectedUsersExchangesObject);
				expect(usersExchange.userId).toEqual(1);
			});
		});
	});
};

export default runUpdateTests;
