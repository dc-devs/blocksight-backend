import * as request from 'supertest';
import ErrorMessages from './enums/error-messages.enum';
import UserProperties from './enums/user-properties.enum';
import initializeTestApp from '../init/initializeTestApp';
import { INestApplication, HttpStatus } from '@nestjs/common';
import ExtensionCodes from '../helpers/enums/extension-codes.enum';
import { UserRole } from '@prisma/client';

describe('Users', () => {
	let app: INestApplication;

	beforeAll(async () => {
		app = await initializeTestApp();
	});

	afterAll(async () => {
		await app.close();
	});

	describe('Update', () => {
		// describe('when sending a valid user id and invalid udpate data', () => {
		// 	let updateUserInput;

		// 	beforeEach(() => {
		// 		updateUserInput = {
		// 			email: 'test@gmail.com',
		// 			role: 'ADMIN',
		// 			password: '12345678',
		// 			createdAt: '2022-04-23T23:05:10.681Z',
		// 			updatedAt: '2022-04-23T23:05:10.682Z',
		// 		};
		// 	});

		// 	it('should return a error', async () => {
		// 		const id = 1;
		// 		const query = {
		// 			operationName: 'Mutation',
		// 			query: `
		// 				mutation Mutation($updateGuserInput: UpdateGuserInput!) {
		// 					updateGuser(updateGuserInput: $updateGuserInput) {
		// 						id
		// 						email
		// 						role
		// 						createdAt
		// 						updatedAt
		// 					}
		// 				}`,
		// 			variables: {
		// 				updateGuserInput: {
		// 					id,
		// 					data: updateUserInput,
		// 				},
		// 			},
		// 		};
		// 		const response = await request(app.getHttpServer())
		// 			.post('/graphql')
		// 			.send(query);

		// 		// expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
		// 		// expect(response.body.message).toEqual([
		// 		// 	Validation.ROLE_SHOULD_NOT_EXIST,
		// 		// 	Validation.PASSWORD_SHOULD_NOT_EXIST,
		// 		// 	Validation.CREATED_AT_SHOULD_NOT_EXIST,
		// 		// 	Validation.UPDATED_AT_SHOULD_NOT_EXIST,
		// 		// ]);
		// 		// const errors = response.body.errors;
		// 		console.log(response.body);
		// 		// const emailError = errors[0];
		// 		// const passwordError = errors[1];

		// 		// expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);

		// 		// expect(errors.length).toEqual(2);

		// 		// errors.forEach((error) => {
		// 		// 	expect(error.extensions.code).toEqual(
		// 		// 		ExtensionCodes.BAD_USER_INPUT
		// 		// 	);
		// 		// });

		// 		// expect(emailError.message).toContain(
		// 		// 	ErrorMessages.EMAIL_MUST_BE_STRING
		// 		// );
		// 		// expect(passwordError.message).toContain(
		// 		// 	ErrorMessages.PASSWORD_MUST_BE_STRING
		// 		// );
		// 	});
		// });

		// describe('when sending an invalid user id and udpate data', () => {
		// 	let updateUserInput;

		// 	beforeEach(() => {
		// 		updateUserInput = {
		// 			email: 'test@gmail.com',
		// 		};
		// 	});

		// 	it('should throw an error', async () => {
		// 		const id = 100;
		// 		const response = await request(app.getHttpServer())
		// 			.patch(`/users/${id}`)
		// 			.send(updateUserInput as UpdateUserInput);

		// 		expect(response.statusCode).toEqual(HttpStatus.BAD_REQUEST);
		// 	});
		// });

		describe('when sending a valid user id and udpate data', () => {
			let updateUserInput;

			beforeEach(() => {
				updateUserInput = {
					email: 'test-test-1@gmail.com',
				};
			});

			it('should update user', async () => {
				const id = 1;
				const expectedUserResponse = expect.objectContaining({
					id,
					...updateUserInput,
					role: UserRole.SUPER_ADMIN,
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
				});
				const query = {
					operationName: 'Mutation',
					query: `
						mutation Mutation($id: Int!, $data: UpdateGuserInput!) {
  							updateGuser(id: $id, updateGuserInput: $data) {
								id
								email
								role
								createdAt
								updatedAt
							}
						}`,
					variables: {
						id,
						data: updateUserInput,
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(query);

				console.log(JSON.stringify(response.body));

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(response.body.data.updateGuser).toEqual(
					expectedUserResponse
				);
			});
		});
	});
});
