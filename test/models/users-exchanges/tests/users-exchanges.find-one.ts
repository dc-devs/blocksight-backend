import request from 'supertest';
import query from '../queries/find-one.query';
import { INestApplication, HttpStatus } from '@nestjs/common';
import initializeTestApp from '../../../helpers/init/initializeTestApp';
import { redisClient } from '../../../../src/server/initialize/initialize-redis';
import expectedUsersExchangesObject from '../expected-objects/expected-users-exchanges-object';

const runFindOneTests = () => {
	describe('FindOne', () => {
		let app: INestApplication;

		beforeAll(async () => {
			app = await initializeTestApp();
		});

		afterAll(async () => {
			await redisClient.disconnect();
			await app.close();
		});

		describe('when querying with an id for a UsersExchanges that does exist', () => {
			it('should return UsersExchanges', async () => {
				const id = 1;
				const graphQlquery = {
					operationName: 'Query',
					query,
					variables: {
						findOneUsersExchangesInput: {
							id,
						},
					},
				};

				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(graphQlquery);

				const usersExchanges = response.body.data.findOneUsersExchanges;

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(usersExchanges.id).toEqual(id);
				expect(usersExchanges).toEqual(expectedUsersExchangesObject);
			});
		});

		describe('validation', () => {});
	});
};

export default runFindOneTests;
