import request from 'supertest';
import { UserRole } from '@prisma/client';
import query from '../queries/find-all.query';
import UserProperty from '../enums/user-property.enum';
import { INestApplication, HttpStatus } from '@nestjs/common';
import {
	testApp,
	initializeTestApp,
} from '../../../helpers/init/initializeTestApp';
import expectedUserObject from '../expected-objects/expected-user-object';
import expectedUserObjectWithRelation from '../expected-objects/expected-user-object-with-relation';
import {
	allUsersCount,
	thirdUser as thirdUserAdmin,
	secondUser as secondUserAdmin,
	firstUser as firstUserSuperAdmin,
} from '../../../../prisma/seeds/users.seed';

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

		describe('when querying to get all users', () => {
			it('should return all users', async () => {
				const graphQlquery = {
					operationName: 'Query',
					query,
					variables: {
						findAllUsersInput: {},
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(graphQlquery);

				const users = response.body.data.findAllUsers;

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(users.length).toEqual(allUsersCount);

				users.forEach((user) => {
					if (user.id === 1) {
						expect(user).toEqual(expectedUserObjectWithRelation);
					} else {
						expect(user).toEqual(expectedUserObject);
					}
					expect(user).not.toHaveProperty(UserProperty.PASSWORD);
				});
			});
		});

		describe('when querying with arguments', () => {
			describe('where', () => {
				describe("and the where argument aims to fetch users with 'role: SUPER_ADMIN'", () => {
					it('should return all users with that role', async () => {
						const graphQlquery = {
							operationName: 'Query',
							query,
							variables: {
								findAllUsersInput: {
									where: {
										role: UserRole.SUPER_ADMIN,
									},
								},
							},
						};

						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(graphQlquery);

						const users = response.body.data.findAllUsers;

						expect(response.statusCode).toEqual(HttpStatus.OK);
						expect(users).toHaveLength(1);

						users.forEach((user) => {
							if (user.id === 1) {
								expect(user).toEqual(
									expectedUserObjectWithRelation,
								);
							} else {
								expect(user).toEqual(expectedUserObject);
							}
							expect(user).not.toHaveProperty(
								UserProperty.PASSWORD,
							);
							expect(user.role).toEqual(UserRole.SUPER_ADMIN);
						});
					});
				});

				describe("and the where AND argument aims to fetch one users with 'role: ADMIN' and a specified email", () => {
					it('should return all users with that role', async () => {
						const graphQlquery = {
							operationName: 'Query',
							query,
							variables: {
								findAllUsersInput: {
									where: {
										role: UserRole.ADMIN,
										AND: [{ email: thirdUserAdmin.email }],
									},
								},
							},
						};

						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(graphQlquery);

						const users = response.body.data.findAllUsers;
						const user = users[0];

						expect(response.statusCode).toEqual(HttpStatus.OK);

						expect(users).toHaveLength(1);

						expect(user.role).toEqual(UserRole.ADMIN);
						expect(user.email).toEqual(thirdUserAdmin.email);
						expect(user).toEqual(expectedUserObject);
						expect(user).not.toHaveProperty(UserProperty.PASSWORD);
					});
				});

				describe("and the where NOT argument aims to fetch one users with 'role: ADMIN' and not a specified email", () => {
					it('should return all users with that role', async () => {
						const graphQlquery = {
							operationName: 'Query',
							query,
							variables: {
								findAllUsersInput: {
									where: {
										role: UserRole.ADMIN,
										NOT: [{ email: thirdUserAdmin.email }],
									},
								},
							},
						};

						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(graphQlquery);

						const users = response.body.data.findAllUsers;
						const user = users[0];

						expect(response.statusCode).toEqual(HttpStatus.OK);

						expect(users).toHaveLength(2);

						expect(user.role).toEqual(UserRole.ADMIN);
						expect(user.email).toEqual(secondUserAdmin.email);
						expect(user).toEqual(expectedUserObject);
						expect(user).not.toHaveProperty(UserProperty.PASSWORD);
					});
				});

				describe("and the where OR argument aims to fetch one users with 'role: ADMIN' or 'role: SUPER_ADMIN'", () => {
					it('should return all users with that role', async () => {
						const graphQlquery = {
							operationName: 'Query',
							query,
							variables: {
								findAllUsersInput: {
									where: {
										OR: [
											{ role: UserRole.ADMIN },
											{ role: UserRole.SUPER_ADMIN },
										],
									},
								},
							},
						};

						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(graphQlquery);

						const users = response.body.data.findAllUsers;
						const firstSelectedUser = users[0];
						const thirdSelectedUser = users[2];

						expect(response.statusCode).toEqual(HttpStatus.OK);

						expect(users).toHaveLength(4);

						expect(firstSelectedUser.role).toEqual(
							firstUserSuperAdmin.role,
						);
						expect(firstSelectedUser.email).toEqual(
							firstUserSuperAdmin.email,
						);

						expect(thirdSelectedUser.role).toEqual(
							thirdUserAdmin.role,
						);
						expect(thirdSelectedUser.email).toEqual(
							thirdUserAdmin.email,
						);

						users.forEach((user) => {
							if (user.id === 1) {
								expect(user).toEqual(
									expectedUserObjectWithRelation,
								);
							} else {
								expect(user).toEqual(expectedUserObject);
							}
							expect(user).not.toHaveProperty(
								UserProperty.PASSWORD,
							);
						});
					});
				});
			});

			describe('pagination', () => {
				describe('and the skip and take arguments are used to implement pagination', () => {
					describe('and the skip param is 10, and the take param is 10', () => {
						it('should return the first 10 users', async () => {
							const skip = 10;
							const take = 10;
							const graphQlquery = {
								operationName: 'Query',
								query,
								variables: {
									findAllUsersInput: {
										skip,
										take,
									},
								},
							};
							const response = await request(app.getHttpServer())
								.post('/graphql')
								.send(graphQlquery);

							const users = response.body.data.findAllUsers;

							expect(response.statusCode).toEqual(HttpStatus.OK);
							expect(users).toHaveLength(take);

							users.forEach((user) => {
								if (user.id === 1) {
									expect(user).toEqual(
										expectedUserObjectWithRelation,
									);
								} else {
									expect(user).toEqual(expectedUserObject);
								}
								expect(user).not.toHaveProperty(
									UserProperty.PASSWORD,
								);
							});

							const lastUser = users[users.length - 1];
							const lastUserId = skip + take;
							expect(lastUser.id).toEqual(lastUserId);
						});
					});
				});

				describe('and the cursor and take arguments are used to implement pagination', () => {
					describe('and the cursor param is 11, and the take param is 10', () => {
						it('should return the first 10 users', async () => {
							const cursor = { id: 11 };
							const take = 10;
							const graphQlquery = {
								operationName: 'Query',
								query,
								variables: {
									findAllUsersInput: {
										cursor,
										take,
									},
								},
							};

							const response = await request(app.getHttpServer())
								.post('/graphql')
								.send(graphQlquery);

							const users = response.body.data.findAllUsers;

							expect(response.statusCode).toEqual(HttpStatus.OK);
							expect(users).toHaveLength(take);

							users.forEach((user) => {
								if (user.id === 1) {
									expect(user).toEqual(
										expectedUserObjectWithRelation,
									);
								} else {
									expect(user).toEqual(expectedUserObject);
								}
								expect(user).not.toHaveProperty(
									UserProperty.PASSWORD,
								);
							});

							const lastUser = users[users.length - 1];
							const lastUserId = cursor.id + take - 1;
							expect(lastUser.id).toEqual(lastUserId);
						});
					});
				});
			});
		});
	});
};

export default runFindAllTests;
