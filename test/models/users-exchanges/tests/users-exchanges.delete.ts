import request from 'supertest';
import query from '../queries/delete.query';
import ErrorMessage from '../enums/error-message.enum';
import ErrorCode from '../../../../src/prisma/error-code.enum';
import { INestApplication, HttpStatus } from '@nestjs/common';
import initializeTestApp from '../../../helpers/init/initializeTestApp';
import { allModelsCount } from '../../../../prisma/seeds/users-exchanges.seed';
import expectedUsersExchangesObject from '../expected-objects/expected-users-exchanges-object';
import { redisClient } from '../../../../src/server/initialize/initialize-redis';
import GraphQLErrorMessage from '../../../../src/graphql/errors/error-message.enum';

const runDeleteTests = () => {
	describe('Delete', () => {
		let app: INestApplication;

		beforeAll(async () => {
			app = await initializeTestApp();
		});

		afterAll(async () => {
			await redisClient.disconnect();
			await app.close();
		});

		describe('when deleting with a valid UsersExchanges id', () => {
			it('should delete that UsersExchanges', async () => {
				const id = allModelsCount;
				const graphqlQuery = {
					operationName: 'Mutation',
					query,
					variables: {
						deleteUsersExchangesInput: id,
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(graphqlQuery);

				const usersExchanges = response.body.data.deleteUsersExchanges;

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(usersExchanges).toEqual(expectedUsersExchangesObject);
			});
		});

		describe('validation', () => {});
	});
};

export default runDeleteTests;
