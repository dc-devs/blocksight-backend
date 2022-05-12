import * as request from 'supertest';
import UserProperty from './enums/user-property.enum';
import initializeTestApp from '../helpers/init/initializeTestApp';
import { INestApplication, HttpStatus } from '@nestjs/common';
import expectedUserObject from './expected-objects/expected-user-object';

describe('Users', () => {
	let app: INestApplication;

	beforeAll(async () => {
		app = await initializeTestApp();
	});

	afterAll(async () => {
		await app.close();
	});

	describe('Find One', () => {
		describe('when route requested with an id for user that does exist', () => {
			it('should return user', async () => {
				const id = 1;
				const query = {
					operationName: 'Query',
					query: `
						query Query($id: Int!) {
							user(id: $id) {
								id
								email
								role
								createdAt
								updatedAt
							}
						}`,
					variables: { id },
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(query);

				const user = response.body.data.user;

				expect(response.statusCode).toEqual(HttpStatus.OK);
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
						query Query($id: Int!) {
							user(id: $id) {
								id
								email
								role
								createdAt
								updatedAt
							}
						}`,
						variables: { id },
					};
					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(query);

					const user = response.body.data.user;

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(user).toBeNull();
				});
			});
		});
	});
});
