import request from 'supertest';
import query from '../queries/create.query';
import ErrorMessage from '../enums/error-message.enum';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { firstRecord } from '../../../../prisma/seeds/users-exchanges.seed';
import initializeTestApp from '../../../helpers/init/initializeTestApp';
import ExtensionCode from '../../../../src/graphql/errors/extension-code.enum';
import { UsersExchangesValidationError } from '../../../../src/models/users-exchanges/enums';
import { redisClient } from '../../../../src/server/initialize/initialize-redis';
import expectedUsersExchangesObject from '../expected-objects/expected-users-exchanges-object';

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

		describe('when creating a new UsersExchanges with valid inputs', () => {
			const createUsersExchangesInput = {
				name: 'New Exchnage',
				websiteUrl: 'https://new-UsersExchanges.com/',
				logoUrl: 'https://new-UsersExchanges.com/logo',
				companyLogoUrl: 'https://new-UsersExchanges.com/company-logo',
				hasApi: true,
				hasCsv: true,
			};

			it('should create and return that UsersExchanges', async () => {
				const graphqlQuery = {
					operationName: 'Mutation',
					query,
					variables: {
						createUsersExchangesInput,
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(graphqlQuery);

				const UsersExchanges = response.body.data.createUsersExchanges;

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(UsersExchanges).toEqual(expectedUsersExchangesObject);
			});
		});

		describe('validation', () => {
			describe('when creating with no data', () => {
				let createUsersExchangesInput;
				let errorResponseMessage: string[];

				beforeEach(() => {
					createUsersExchangesInput = {};
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
							createUsersExchangesInput,
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
				describe('when creating an UsersExchanges with a name that already exists', () => {
					let createUsersExchangesInput;

					beforeEach(() => {
						createUsersExchangesInput = {
							name: firstRecord.name,
							websiteUrl: 'https://new-UsersExchanges.com/',
							logoUrl: 'https://new-UsersExchanges.com/logo',
							companyLogoUrl:
								'https://new-UsersExchanges.com/company-logo',
							hasApi: true,
							hasCsv: true,
						};
					});

					it('should return an error', async () => {
						const graphqlQuery = {
							operationName: 'Mutation',
							query,
							variables: {
								createUsersExchangesInput,
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
							UsersExchangesValidationError.NAME_IS_TAKEN,
						);
					});
				});
			});
		});
	});
};

export default runCreateTests;
