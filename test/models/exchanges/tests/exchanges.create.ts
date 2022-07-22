import request from 'supertest';
import query from '../queries/create.query';
import ErrorMessage from '../enums/error-message.enum';
import { INestApplication, HttpStatus } from '@nestjs/common';
import ErrorCode from '../../../../src/prisma/error-code.enum';
import { coinbasePro } from '../../../../prisma/seeds/exchanges.seed';
import initializeTestApp from '../../../helpers/init/initializeTestApp';
import ExtensionCode from '../../../../src/graphql/errors/extension-code.enum';
import { ExchangeValidationError } from '../../../../src/models/exchanges/enums';
import { redisClient } from '../../../../src/server/initialize/initialize-redis';
import expectedExchangeObject from '../expected-objects/expected-exchange-object';
import GraphQLErrorMessage from '../../../../src/graphql/errors/error-message.enum';

const runCreateTests = () => {
	describe('Create', () => {
		let app: INestApplication;

		beforeAll(async () => {
			app = await initializeTestApp();
		});

		afterAll(async () => {
			await redisClient.disconnect();
			await app.close();
		});

		describe('when creating a new exchange with valid inputs', () => {
			const createExchangeInput = {
				name: 'New Exchnage',
				websiteUrl: 'https://new-exchange.com/',
				logoUrl: 'https://new-exchange.com/logo',
				companyLogoUrl: 'https://new-exchange.com/company-logo',
				hasApi: true,
				hasCsv: true,
			};

			it('should create and return that exchange', async () => {
				const graphqlQuery = {
					operationName: 'Mutation',
					query,
					variables: {
						createExchangeInput,
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(graphqlQuery);

				const exchange = response.body.data.createExchange;

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(exchange).toEqual(expectedExchangeObject);
			});
		});

		describe('validation', () => {
			describe('when creating with no data', () => {
				let createExchangeInput;
				let errorResponseMessage: string[];

				beforeEach(() => {
					createExchangeInput = {};
					errorResponseMessage = [
						ErrorMessage.NAME_MUST_BE_A_STRING,
						ErrorMessage.WEBSITE_URL_MUST_BE_A_STRING,
						ErrorMessage.LOGO_URL_MUST_BE_A_STRING,
						ErrorMessage.COMPANY_LOGO_URL_MUST_BE_A_STRING,
						ErrorMessage.HAS_API_MUST_BE_A_BOOLEAN,
						ErrorMessage.HAS_CSV_MUST_BE_A_BOOLEAN,
					];
				});

				it('should return an error', async () => {
					const graphqlQuery = {
						operationName: 'Mutation',
						query,
						variables: {
							createExchangeInput,
						},
					};

					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(graphqlQuery);

					const errors = response.body.errors;
					const error = errors[0];
					const { extensions } = error;
					const { code, response: errorResponse } = extensions;

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(errors.length).toEqual(1);

					expect(code).toEqual(ExtensionCode.BAD_USER_INPUT);

					console.log(errorResponse.message);
					console.log(errorResponseMessage);

					expect(errorResponse.message).toEqual(
						expect.arrayContaining(errorResponseMessage),
					);
				});
			});

			describe('name', () => {
				describe('when creating an exchange with a name that already exists', () => {
					let createExchangeInput;

					beforeEach(() => {
						createExchangeInput = {
							name: coinbasePro.name,
							websiteUrl: 'https://new-exchange.com/',
							logoUrl: 'https://new-exchange.com/logo',
							companyLogoUrl:
								'https://new-exchange.com/company-logo',
							hasApi: true,
							hasCsv: true,
						};
					});

					it('should return an error', async () => {
						const graphqlQuery = {
							operationName: 'Mutation',
							query,
							variables: {
								createExchangeInput,
							},
						};
						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(graphqlQuery);
						console.log(response.body);
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
		});
	});
};

export default runCreateTests;
