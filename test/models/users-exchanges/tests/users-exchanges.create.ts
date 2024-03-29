import request from 'supertest';
import query from '../queries/create.query';
import ErrorMessage from '../enums/error-message.enum';
import SecretBox from '../../../../src/utils/secret-box';
import { INestApplication, HttpStatus } from '@nestjs/common';
import ExtensionCode from '../../../../src/graphql/errors/extension-code.enum';
import { UsersExchangesValidationError } from '../../../../src/models/users-exchanges/enums';
import expectedUsersExchangesObject from '../expected-objects/expected-users-exchanges-object';
import {
	testApp,
	initializeTestApp,
} from '../../../helpers/init/initializeTestApp';

const runCreateTests = () => {
	describe('Create', () => {
		let app: INestApplication;
		let createUsersExchangesInput;

		beforeAll(async () => {
			if (testApp) {
				app = testApp;
			} else {
				app = await initializeTestApp();
			}

			createUsersExchangesInput = {
				userId: 2,
				exchangeId: 1,
				apiKey: 'Test value 1',
				apiSecret: 'Test value 2',
				apiPassphrase: 'Test value 3',
				apiNickname: 'Test value 4',
			};
		});

		describe('when creating a new UsersExchanges with valid inputs', () => {
			it('should create and return UsersExchanges', async () => {
				const secretbox = new SecretBox();
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

				const usersExchanges = response.body.data.createUsersExchanges;
				const { apiKey, apiPassphrase, apiSecret } = usersExchanges;
				const {
					apiKey: apiKeyInput,
					apiSecret: apiSecretInput,
					apiPassphrase: apiPassphraseInput,
				} = createUsersExchangesInput;

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(usersExchanges).toEqual(expectedUsersExchangesObject);

				expect(await secretbox.decrypt(apiKey)).toEqual(apiKeyInput);
				expect(await secretbox.decrypt(apiPassphrase)).toEqual(
					apiPassphraseInput,
				);
				expect(await secretbox.decrypt(apiSecret)).toEqual(
					apiSecretInput,
				);
			});
		});

		describe('validation', () => {
			describe('when creating with no data', () => {
				let createUsersExchangesInput;
				let errorResponseMessage: string[];

				beforeEach(() => {
					createUsersExchangesInput = {};
					errorResponseMessage = [
						expect.stringContaining(
							ErrorMessage.USER_ID_MUST_BE_A_NUMBER,
						),
						expect.stringContaining(
							ErrorMessage.EXCHANGE_ID_MUST_BE_A_NUMBER,
						),
						expect.stringContaining(
							ErrorMessage.API_KEY_MUST_BE_A_STRING,
						),
						expect.stringContaining(
							ErrorMessage.API_SECRET_MUST_BE_A_STRING,
						),
						expect.stringContaining(
							ErrorMessage.API_PASSPHRASE_MUST_BE_A_STRING,
						),
						expect.stringContaining(
							ErrorMessage.API_NICKNAME_MUST_BE_A_STRING,
						),
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

					expect(errorResponse.message).toEqual(
						expect.arrayContaining(errorResponseMessage),
					);
				});
			});

			describe('when creating and the user-exchange alrerady exists', () => {
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

					const uniqueUserExchangeError =
						extensions.errors.uniqueUserExchange;

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(errors.length).toEqual(1);

					expect(uniqueUserExchangeError.type).toEqual(
						ExtensionCode.BAD_USER_INPUT,
					);

					expect(uniqueUserExchangeError.message).toEqual(
						UsersExchangesValidationError.EXCHANGE_ALREADY_ADDED,
					);
				});
			});
		});
	});
};

export default runCreateTests;
