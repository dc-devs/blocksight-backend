import request from 'supertest';
import query from '../queries/update.query';
import ErrorMessage from '../enums/error-message.enum';
import { INestApplication, HttpStatus } from '@nestjs/common';
import initializeTestApp from '../../../helpers/init/initializeTestApp';
import { allModelsCount } from '../../../../prisma/seeds/fiat-transfers.seed';
import ExtensionCode from '../../../../src/graphql/errors/extension-code.enum';
import { redisClient } from '../../../../src/server/initialize/initialize-redis';

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

		describe('when updating with a valid FiatTransfer id and udpate data', () => {
			let updateFiatTransferInput;

			beforeEach(() => {
				updateFiatTransferInput = {
					type: 'Updated Type',
					amount: 100.01,
					currency: 'Updated Currency',
					timestamp: '2022-08-14T17:42:49.400Z',
					transferData: '{"test":"value"}',
					exchangeId: 1,
				};
			});

			it('should update FiatTransfer', async () => {
				const id = 1;
				const expectedFiatTransferResponse = expect.objectContaining({
					id,
					...updateFiatTransferInput,
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
				});
				const graphqlQuery = {
					operationName: 'Mutation',
					query,
					variables: {
						id,
						updateFiatTransferInput,
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(graphqlQuery);

				const exchange = response.body.data.updateFiatTransfer;

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(exchange).toEqual(expectedFiatTransferResponse);
			});
		});

		describe('validation', () => {
			describe('when updating with an invalid FiatTransfer id', () => {
				let updateFiatTransferInput;

				beforeEach(() => {
					updateFiatTransferInput = {
						type: 'Updated Type',
						amount: 100.01,
						currency: 'Updated Currency',
						timestamp: '2022-08-14T17:42:49.400Z',
						transferData: '{"test":"value"}',
						exchangeId: 1,
					};
				});

				it('should return a error', async () => {
					const id = allModelsCount + 10;
					const graphqlQuery = {
						operationName: 'Mutation',
						query,
						variables: {
							id,
							updateFiatTransferInput,
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
};

export default runUpdateTests;
