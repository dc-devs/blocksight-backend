import request from 'supertest';
import query from '../queries/update-query';
import ErrorMessage from '../enums/error-message.enum';
import { INestApplication, HttpStatus } from '@nestjs/common';
import initializeTestApp from '../../../helpers/init/initializeTestApp';
import { allExchangesCount } from '../../../../prisma/seeds/exchanges.seed';
import ExtensionCode from '../../../../src/graphql/errors/extension-code.enum';
import { redisClient } from '../../../../src/server/initialize/initialize-redis';
import { ExchangeValidationError } from '../../../../src/models/exchanges/enums';

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
		
		// maybe replace with firstModel
		const updateName = 'test-company-name';

		describe('when updating with a valid exchange id and udpate data', () => {
			let updateExchangeInput;

			beforeEach(() => {
				updateExchangeInput = {
					name: updateName,
					websiteUrl: 'http://test.com',
					logoUrl: 'http://test.com/logo',
					companyLogoUrl: 'http://test.com/company-logo',
					hasApi: false,
					hasCsv: false,
				};
			});

			it('should update exchange', async () => {
				const id = 1;
				const expectedExchangeResponse = expect.objectContaining({
					id,
					...updateExchangeInput,
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
				});
				const graphqlQuery = {
					operationName: 'Mutation',
					query,
					variables: {
						id,
						updateExchangeInput,
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(graphqlQuery);

				const exchange = response.body.data.updateExchange;

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(exchange).toEqual(expectedExchangeResponse);
			});
		});

		describe('validation', () => {
			describe('name', () => {
				describe('when updating to a name that already exists', () => {
					let updateExchangeInput;

					beforeEach(() => {
						updateExchangeInput = {
							name: updateName,
						};
					});

					it('should return an error', async () => {
						const id = 2;
						const graphqlQuery = {
							operationName: 'Mutation',
							query,
							variables: {
								id,
								updateExchangeInput,
							},
						};
						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(graphqlQuery);

						const errors = response.body.errors;
						const error = errors[0];
						const { extensions } = error;
						const nameError = extensions.errors.name;

						expect(response.statusCode).toEqual(HttpStatus.OK);
						expect(errors.length).toEqual(1);

						expect(nameError.type).toEqual(
							ExtensionCode.BAD_USER_INPUT,
						);

						expect(nameError.message).toEqual(
							ExchangeValidationError.NAME_IS_TAKEN,
						);
					});
				});
			});

			describe('invalid params', () => {
				describe('when updating with a valid exchange id and invalid udpate data', () => {
					let updateExchangeInput;

					beforeEach(() => {
						updateExchangeInput = {
							password: '12345678',
						};
					});

					it('should return a error', async () => {
						const id = 1;
						const graphqlQuery = {
							operationName: 'Mutation',
							query,
							variables: {
								id,
								updateExchangeInput,
							},
						};
						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(graphqlQuery);

						const errors = response.body.errors;

						expect(errors.length).toEqual(1);

						errors.forEach((error) => {
							expect(error.extensions.code).toEqual(
								ExtensionCode.BAD_USER_INPUT,
							);
						});
					});
				});

				describe('when updating with an invalid exchange id and valid udpate data', () => {
					let updateExchangeInput;

					beforeEach(() => {
						updateExchangeInput = {
							name: 'test-name',
						};
					});

					it('should return a error', async () => {
						const id = allExchangesCount + 10;
						const graphqlQuery = {
							operationName: 'Mutation',
							query,
							variables: {
								id,
								updateExchangeInput,
							},
						};
						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(graphqlQuery);

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
