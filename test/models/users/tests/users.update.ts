import request from 'supertest';
import { UserRole } from '@prisma/client';
import query from '../queries/update.query';
import UserProperty from '../enums/user-property.enum';
import ErrorMessage from '../enums/error-message.enum';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { firstUser } from '../../../../prisma/seeds/users.seed';
import {
	testApp,
	initializeTestApp,
} from '../../../helpers/init/initializeTestApp';
import ExtensionCode from '../../../../src/graphql/errors/extension-code.enum';
import UserValidationError from '../../../../src/models/users/enums/user-validation-error.enum';

const runUpdateTests = () => {
	describe('Update', () => {
		let app: INestApplication;

		beforeAll(async () => {
			if (testApp) {
				app = testApp;
			} else {
				app = await initializeTestApp();
			}
		});

		describe('when updating with a valid user id and udpate data', () => {
			let updateUserInput;

			beforeEach(() => {
				updateUserInput = {
					email: 'test-test-1@gmail.com',
				};
			});

			it('should update user', async () => {
				const id = 50;
				const expectedUserResponse = expect.objectContaining({
					id,
					...updateUserInput,
					role: UserRole.USER,
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
				});
				const graphQlquery = {
					operationName: 'Mutation',
					query,
					variables: {
						id,
						data: updateUserInput,
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(graphQlquery);

				const user = response.body.data.updateUser;

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(user).toEqual(expectedUserResponse);
				expect(user).not.toHaveProperty(UserProperty.PASSWORD);
			});
		});

		describe('validation', () => {
			describe('email', () => {
				describe('when updating with an email that is not an email', () => {
					let id = 20;
					let updateUserInput;

					beforeEach(() => {
						updateUserInput = {
							email: 'david-test-2',
						};
					});

					it('should return an error', async () => {
						const graphQlquery = {
							operationName: 'Mutation',
							query,
							variables: {
								id,
								data: updateUserInput,
							},
						};
						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(graphQlquery);

						const errors = response.body.errors;
						const emailError = errors[0];
						const { extensions } = emailError;

						expect(response.statusCode).toEqual(HttpStatus.OK);

						expect(errors.length).toEqual(1);

						expect(extensions.code).toEqual(
							ExtensionCode.BAD_USER_INPUT,
						);

						expect(extensions.response.message).toContain(
							ErrorMessage.EMAIL_IS_EMAIL,
						);
					});
				});

				describe('when updating with an email that already exists', () => {
					let updateUserInput;

					beforeEach(() => {
						updateUserInput = {
							email: firstUser.email,
						};
					});

					it('should return an error', async () => {
						const id = 20;
						const graphQlquery = {
							operationName: 'Mutation',
							query,
							variables: {
								id,
								data: updateUserInput,
							},
						};
						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(graphQlquery);

						const errors = response.body.errors;
						const error = errors[0];
						const { extensions } = error;
						const emailError = extensions.errors.email;

						expect(response.statusCode).toEqual(HttpStatus.OK);
						expect(errors.length).toEqual(1);

						expect(emailError.type).toEqual(
							ExtensionCode.BAD_USER_INPUT,
						);

						expect(emailError.message).toEqual(
							UserValidationError.EMAIL_IS_TAKEN,
						);
					});
				});
			});

			describe('invalid params', () => {
				describe('when updating with a valid user id and invalid udpate data', () => {
					let updateUserInput;

					beforeEach(() => {
						updateUserInput = {
							email: 'test-test-1@gmail.com',
							role: UserRole.ADMIN,
							password: '12345678',
						};
					});

					it('should return a error', async () => {
						const id = 1;
						const graphQlquery = {
							operationName: 'Mutation',
							query,
							variables: {
								id,
								data: updateUserInput,
							},
						};
						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(graphQlquery);

						const errors = response.body.errors;
						const roleError = errors[0];
						const passwordError = errors[1];

						expect(errors.length).toEqual(2);

						errors.forEach((error) => {
							expect(error.extensions.code).toEqual(
								ExtensionCode.BAD_USER_INPUT,
							);
						});

						expect(roleError.message).toContain(
							ErrorMessage.ROLE_FIELD_NOT_DEFINED,
						);

						expect(passwordError.message).toContain(
							ErrorMessage.PASSWORD_FIELD_NOT_DEFINED,
						);
					});
				});

				describe('when updating with an invalid user id and valid udpate data', () => {
					let updateUserInput;

					beforeEach(() => {
						updateUserInput = {
							email: 'test-test-1@gmail.com',
						};
					});

					it('should return a error', async () => {
						const id = 100;
						const graphQlquery = {
							operationName: 'Mutation',
							query,
							variables: {
								id,
								data: updateUserInput,
							},
						};
						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(graphQlquery);

						const errors = response.body.errors;
						const error = errors[0];
						const { extensions } = error;

						expect(errors.length).toEqual(1);

						expect(extensions.errors.cause.type).toEqual(
							ExtensionCode.BAD_USER_INPUT,
						);

						expect(extensions.errors.cause.message).toEqual(
							ErrorMessage.UPDATE_RECORD_NOT_FOUND,
						);
					});
				});
			});
		});
	});
};

export default runUpdateTests;
