import request from 'supertest';
import query from '../queries/update.query';
import ErrorMessage from '../enums/error-message.enum';
import { INestApplication, HttpStatus } from '@nestjs/common';
import initializeTestApp from '../../../helpers/init/initializeTestApp';
import { allModelsCount } from '../../../../prisma/seeds/users-exchanges.seed';
import ExtensionCode from '../../../../src/graphql/errors/extension-code.enum';
import { redisClient } from '../../../../src/server/initialize/initialize-redis';
import { UsersExchangesValidationError } from '../../../../src/models/users-exchanges/enums';

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

		describe('validation', () => {});
	});
};

export default runUpdateTests;
