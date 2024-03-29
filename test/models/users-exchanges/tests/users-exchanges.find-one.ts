import request from 'supertest';
import query from '../queries/find-one.query';
import { INestApplication, HttpStatus } from '@nestjs/common';
import {
	testApp,
	initializeTestApp,
} from '../../../helpers/init/initializeTestApp';
import { allModelsCount } from '../../../../prisma/seeds/users-exchanges.seed';
import expectedUsersExchangesObject from '../expected-objects/expected-users-exchanges-with-relation-object';

const runFindOneTests = () => {
	describe('FindOne', () => {
		let app: INestApplication;

		beforeAll(async () => {
			if (testApp) {
				app = testApp;
			} else {
				app = await initializeTestApp();
			}
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

		describe('validation', () => {
			describe('when querying with an id for UsersExchanges that does not exist', () => {
				it('should return null', async () => {
					const id = allModelsCount + 10;
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

					const usersExchanges =
						response.body.data.findOneUsersExchanges;

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(usersExchanges).toBeNull();
				});
			});

			describe('when querying with no data', () => {
				it('should return null', async () => {
					const graphQlquery = {
						operationName: 'Query',
						query,
						variables: {
							findOneUsersExchangesInput: {},
						},
					};

					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(graphQlquery);

					const usersExchanges =
						response.body.data.findOneUsersExchanges;

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(usersExchanges).toBeNull();
				});
			});
		});
	});
};

export default runFindOneTests;
