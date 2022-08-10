import request from 'supertest';
import query from '../queries/update.query';
import ErrorMessage from '../enums/error-message.enum';
import { INestApplication, HttpStatus } from '@nestjs/common';
import initializeTestApp from '../../../helpers/init/initializeTestApp';
import { allModelsCount } from '../../../../prisma/seeds/users-exchanges.seed';
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

		describe('when updating with a valid UsersExchanges id and udpate data', () => {
			let updateUsersExchangesInput;

			beforeEach(() => {
				updateUsersExchangesInput = {
					userId: 3,
					exchangeId: 3,
					apiKey: 'Updated Value',
					apiSecret: 'Updated Value',
					apiPassphrase: 'Updated Value',
					apiNickname: 'Updated Value',
				};
			});

			it('should update UsersExchanges', async () => {
				const id = 1;
				const expectedUsersExchangesResponse = expect.objectContaining({
					id,
					...updateUsersExchangesInput,
					createdAt: expect.any(String),
					updatedAt: expect.any(String),
				});
				const graphqlQuery = {
					operationName: 'Mutation',
					query,
					variables: {
						id,
						updateUsersExchangesInput,
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(graphqlQuery);

				const exchange = response.body.data.updateUsersExchanges;

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(exchange).toEqual(expectedUsersExchangesResponse);
			});
		});

		describe('validation', () => {
			describe('when updating with an invalid UsersExchanges id', () => {
				let updateUsersExchangesInput;

				beforeEach(() => {
					updateUsersExchangesInput = {
						userId: 3,
						exchangeId: 3,
						apiKey: 'Updated Value',
						apiSecret: 'Updated Value',
						apiPassphrase: 'Updated Value',
						apiNickname: 'Updated Value',
					};
				});

				it('should return a error', async () => {
					const id = allModelsCount + 10;
					const graphqlQuery = {
						operationName: 'Mutation',
						query,
						variables: {
							id,
							updateUsersExchangesInput,
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
