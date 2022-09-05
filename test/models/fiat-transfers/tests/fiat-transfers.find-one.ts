import request from 'supertest';
import query from '../queries/find-one.query';
import { INestApplication, HttpStatus } from '@nestjs/common';
import {
	testApp,
	initializeTestApp,
} from '../../../helpers/init/initializeTestApp';
import { allModelsCount } from '../../../../prisma/seeds/fiat-transfers.seed';
import expectedFiatTransferObject from '../expected-objects/expected-fiat-transfer-with-relation-object';

const runFindOneTests = () => {
	describe('FindOne', () => {
		let app: INestApplication;

		beforeAll(async () => {
			if (testApp) {
				app = testApp;
			} else {
				app = await initializeTestApp();
			}
		});

		describe('when querying with an id for a FiatTransfer that does exist', () => {
			it('should return FiatTransfer', async () => {
				const id = 1;
				const graphQlquery = {
					operationName: 'Query',
					query,
					variables: {
						findOneFiatTransferInput: {
							id,
						},
					},
				};

				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(graphQlquery);

				const fiatTransfer = response.body.data.findOneFiatTransfer;

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(fiatTransfer.id).toEqual(id);
				expect(fiatTransfer).toEqual(expectedFiatTransferObject);
			});
		});

		describe('validation', () => {
			describe('when querying with an id for FiatTransfer that does not exist', () => {
				it('should return null', async () => {
					const id = allModelsCount + 10;
					const graphQlquery = {
						operationName: 'Query',
						query,
						variables: {
							findOneFiatTransferInput: {
								id,
							},
						},
					};

					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(graphQlquery);

					const fiatTransfer = response.body.data.findOneFiatTransfer;

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(fiatTransfer).toBeNull();
				});
			});

			describe('when querying with no data', () => {
				it('should return null', async () => {
					const graphQlquery = {
						operationName: 'Query',
						query,
						variables: {
							findOneFiatTransferInput: {},
						},
					};

					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(graphQlquery);

					const fiatTransfer = response.body.data.findOneFiatTransfer;

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(fiatTransfer).toBeNull();
				});
			});
		});
	});
};

export default runFindOneTests;
