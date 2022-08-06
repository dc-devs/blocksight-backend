import request from 'supertest';
import query from '../queries/find-one.query';
import UserProperty from '../enums/user-property.enum';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { firstUser } from '../../../../prisma/seeds/users.seed';
import initializeTestApp from '../../../helpers/init/initializeTestApp';
import { redisClient } from '../../../../src/server/initialize/initialize-redis';
import expectedUserObject from '../expected-objects/expected-user-object-with-relation';

const runFindOneTests = () => {
	describe('Find One', () => {
		let app: INestApplication;

		beforeAll(async () => {
			app = await initializeTestApp();
		});

		afterAll(async () => {
			await redisClient.disconnect();
			await app.close();
		});

		describe('id', () => {
			describe('when querying with an id for user that does exist', () => {
				it('should return user', async () => {
					const id = 1;
					const graphQlquery = {
						operationName: 'Query',
						query,
						variables: {
							findOneUserInput: {
								id,
							},
						},
					};

					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(graphQlquery);

					const user = response.body.data.findOneUser;

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(user.id).toEqual(id);
					expect(user).toEqual(expectedUserObject);
					expect(user).not.toHaveProperty(UserProperty.PASSWORD);
				});
			});

			describe('validation', () => {
				describe('when querying with an id for user that does not exist', () => {
					it('should return null', async () => {
						const id = 100;
						const graphQlquery = {
							operationName: 'Query',
							query,
							variables: {
								findOneUserInput: {
									id,
								},
							},
						};

						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(graphQlquery);

						const user = response.body.data.findOneUser;

						expect(response.statusCode).toEqual(HttpStatus.OK);
						expect(user).toBeNull();
					});
				});
			});
		});

		describe('email', () => {
			describe('when querying with an email for user that does exist', () => {
				it('should return user', async () => {
					const email = firstUser.email;
					const graphQlquery = {
						operationName: 'Query',
						query,
						variables: {
							findOneUserInput: {
								email,
							},
						},
					};
					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(graphQlquery);

					const user = response.body.data.findOneUser;

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(user).toEqual(expectedUserObject);
					expect(user).not.toHaveProperty(UserProperty.PASSWORD);
				});
			});

			describe('validation', () => {
				describe('when querying with an email for user that does not exist', () => {
					it('should return null', async () => {
						const email = 'i-dont-exist@gmail.com';
						const graphQlquery = {
							operationName: 'Query',
							query,
							variables: {
								findOneUserInput: {
									email,
								},
							},
						};

						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(graphQlquery);

						const user = response.body.data.findOneUser;

						expect(response.statusCode).toEqual(HttpStatus.OK);
						expect(user).toBeNull();
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
							findOneUserInput: {},
						},
					};

					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(graphQlquery);

					const user = response.body.data.findOneUser;

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(user).toBeNull();
				});
			});
		});
	});
};

export default runFindOneTests;
