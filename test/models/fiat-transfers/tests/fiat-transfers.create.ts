import request from 'supertest';
import query from '../queries/create.query';
import ErrorMessage from '../enums/error-message.enum';
import { INestApplication, HttpStatus } from '@nestjs/common';
import initializeTestApp from '../../../helpers/init/initializeTestApp';
import ExtensionCode from '../../../../src/graphql/errors/extension-code.enum';
import { redisClient } from '../../../../src/server/initialize/initialize-redis';
import expectedFiatTransferObject from '../expected-objects/expected-fiat-transfer-object';

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

		describe('when creating a new FiatTransfer with valid inputs', () => {
			const createFiatTransferInput = {
				type: 'Test value',
				amount: 1,
				currency: 'Test value',
				timestamp: '2021-06-04 16:09:55.901324+00',
				transferData: JSON.stringify({ data: 'Test data' }),
				exchangeId: 1,
			};

			it('should create and return FiatTransfer', async () => {
				const graphqlQuery = {
					operationName: 'Mutation',
					query,
					variables: {
						createFiatTransferInput,
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(graphqlQuery);

				const fiatTransfer = response.body.data.createFiatTransfer;

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(fiatTransfer).toEqual(expectedFiatTransferObject);
			});
		});

		describe('validation', () => {
			describe('when creating with no data', () => {
				let createFiatTransferInput;
				let errorResponseMessage: string[];

				beforeEach(() => {
					createFiatTransferInput = {};
					errorResponseMessage = [
						expect.stringContaining(
							ErrorMessage.TYPE_MUST_BE_A_STRING,
						),
						expect.stringContaining(
							ErrorMessage.AMOUNT_MUST_BE_A_NUMBER,
						),
						expect.stringContaining(
							ErrorMessage.CURRENCY_MUST_BE_A_STRING,
						),
						expect.stringContaining(
							ErrorMessage.TIMESTAMP_MUST_BE_A_DATE,
						),
						expect.stringContaining(
							ErrorMessage.TRANSFER_DATA_MUST_BE_A_STRING,
						),
						expect.stringContaining(
							ErrorMessage.EXCHANGE_ID_MUST_BE_A_NUMBER,
						),
					];
				});

				it('should return an error', async () => {
					const graphqlQuery = {
						operationName: 'Mutation',
						query,
						variables: {
							createFiatTransferInput,
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
		});
	});
};

export default runCreateTests;
