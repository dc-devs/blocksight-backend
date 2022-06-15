import request from 'supertest';
import { firstUser } from '../../prisma/users.seed';
import UserProperty from './enums/user-property.enum';
import { INestApplication, HttpStatus } from '@nestjs/common';
import initializeTestApp from '../helpers/init/initializeTestApp';
import expectedUserObject from './expected-objects/expected-user-object';
import { redisClient } from '../../src/server/initialize/initialize-redis';

describe('Users', () => {
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
			describe('when sending a query with an id for user that does exist', () => {
				it('should return user', async () => {
					const id = 1;
					const query = {
						operationName: 'Query',
						query: `
							query Query($findOneUserInput: FindOneUserInput!) {
								findOneUser(findOneUserInput: $findOneUserInput) {
									id
									role
									email
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

					const user = response.body.data.findOneUser;

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(user.id).toEqual(id);
					expect(user).toEqual(expectedUserObject);
					expect(user).not.toHaveProperty(UserProperty.PASSWORD);
				});
			});

			describe('validation', () => {
				describe('when sending a query with an id for user that does not exist', () => {
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

						const user = response.body.data.findOneUser;

						expect(response.statusCode).toEqual(HttpStatus.OK);
						expect(user).toBeNull();
					});
				});
			});
		});

		describe('email', () => {
			describe('when sending a query with an email for user that does exist', () => {
				it('should return user', async () => {
					const email = firstUser.email;
					const query = {
						operationName: 'Query',
						query: `
							query Query($findOneUserInput: FindOneUserInput!) {
								findOneUser(findOneUserInput: $findOneUserInput) {
									id
									role
									email
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

					const user = response.body.data.findOneUser;

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(user).toEqual(expectedUserObject);
					expect(user).not.toHaveProperty(UserProperty.PASSWORD);
				});
			});

			describe('validation', () => {
				describe('when sending a query with an email for user that does not exist', () => {
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

						const user = response.body.data.findOneUser;

						expect(response.statusCode).toEqual(HttpStatus.OK);
						expect(user).toBeNull();
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

					const user = response.body.data.findOneUser;

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(user).toBeNull();
				});
			});
		});
	});
});
