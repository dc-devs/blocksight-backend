import request from 'supertest';
import query from '../queries/delete.query';
import ErrorMessage from '../enums/error-message.enum';
import ErrorCode from '../../../../src/prisma/error-code.enum';
import { INestApplication, HttpStatus } from '@nestjs/common';
import {
	testApp,
	initializeTestApp,
} from '../../../helpers/init/initializeTestApp';
import { allModelsCount } from '../../../../prisma/seeds/fiat-transfers.seed';
import expectedFiatTransferObject from '../expected-objects/expected-fiat-transfer-object';
import GraphQLErrorMessage from '../../../../src/graphql/errors/error-message.enum';

const runDeleteTests = () => {
	describe('Delete', () => {
		let app: INestApplication;

		beforeAll(async () => {
			if (testApp) {
				app = testApp;
			} else {
				app = await initializeTestApp();
			}
		});

		describe('when deleting with a valid FiatTransfer id', () => {
			it('should delete that FiatTransfer', async () => {
				const id = allModelsCount;
				const graphqlQuery = {
					operationName: 'Mutation',
					query,
					variables: {
						deleteFiatTransferInput: id,
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(graphqlQuery);

				const fiatTransfer = response.body.data.deleteFiatTransfer;

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(fiatTransfer).toEqual(expectedFiatTransferObject);
			});
		});

		describe('validation', () => {
			describe('when deleting with an invalid exchange id', () => {
				it('should delete that exchange', async () => {
					const id = 100;
					const graphqlQuery = {
						operationName: 'Mutation',
						query,
						variables: {
							deleteFiatTransferInput: id,
						},
					};
					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(graphqlQuery);

					const errors = response.body.errors;
					const prismaError = errors[0];
					const exception = prismaError.extensions.exception;

					expect(errors.length).toEqual(1);

					expect(prismaError.message).toContain(
						GraphQLErrorMessage.DATABASE_ERROR,
					);

					expect(exception.code).toEqual(ErrorCode.RECORD_NOT_FOUND);

					expect(exception.meta.cause).toContain(
						ErrorMessage.DELETE_RECORD_NOT_FOUND,
					);
				});
			});
		});
	});
};

export default runDeleteTests;
