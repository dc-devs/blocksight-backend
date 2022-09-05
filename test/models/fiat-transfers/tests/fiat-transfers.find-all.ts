import request from 'supertest';
import query from '../queries/find-all.query';
import { INestApplication, HttpStatus } from '@nestjs/common';
import {
	testApp,
	initializeTestApp,
} from '../../../helpers/init/initializeTestApp';
import { allModelsCount } from '../../../../prisma/seeds/fiat-transfers.seed';
import expectedFiatTransferObject from '../expected-objects/expected-fiat-transfer-with-empty-relation-object';

const runFindAllTests = () => {
	describe('FindAll', () => {
		let app: INestApplication;

		beforeAll(async () => {
			if (testApp) {
				app = testApp;
			} else {
				app = await initializeTestApp();
			}
		});

		describe('when querying to get all FiatTransfer', () => {
			it('should return all FiatTransfer', async () => {
				const graphQlquery = {
					operationName: 'Query',
					query,
					variables: {
						findAllFiatTransfersInput: {},
					},
				};
				const response = await request(app.getHttpServer())
					.post('/graphql')
					.send(graphQlquery);

				const fiatTransfers = response.body.data.findAllFiatTransfers;

				expect(response.statusCode).toEqual(HttpStatus.OK);
				expect(fiatTransfers.length).toEqual(allModelsCount);

				fiatTransfers.forEach((fiatTransfer) => {
					expect(fiatTransfer).toEqual(expectedFiatTransferObject);
				});
			});
		});

		describe('where', () => {
			describe(`when querying and the where argument aims to fetch FiatTransfer with 'type: "deposit"'`, () => {
				it('should return all FiatTransfer with that type', async () => {
					const graphQlquery = {
						operationName: 'Query',
						query,
						variables: {
							findAllFiatTransfersInput: {
								where: {
									type: 'deposit',
								},
							},
						},
					};

					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(graphQlquery);

					const fiatTransfers =
						response.body.data.findAllFiatTransfers;

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(fiatTransfers).toHaveLength(11);

					fiatTransfers.forEach((fiatTransfer) => {
						expect(fiatTransfer).toEqual(
							expectedFiatTransferObject,
						);
						expect(fiatTransfer.type).toEqual('deposit');
					});
				});
			});

			describe(`when querying and the where NOT argument aims to fetch FiatTransfers with 'type: "deposit"' and not 'type: "withdraw"'`, () => {
				it('should return all FiatTransfers with that combination', async () => {
					const graphQlquery = {
						operationName: 'Query',
						query,
						variables: {
							findAllFiatTransfersInput: {
								where: {
									type: 'deposit',
									NOT: [{ type: 'withdraw' }],
								},
							},
						},
					};

					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(graphQlquery);

					const fiatTransfers =
						response.body.data.findAllFiatTransfers;
					const fiatTransfer = fiatTransfers[0];

					expect(response.statusCode).toEqual(HttpStatus.OK);

					expect(fiatTransfers).toHaveLength(11);

					expect(fiatTransfer).toEqual(expectedFiatTransferObject);
					expect(fiatTransfer.type).toEqual('deposit');
				});
			});

			describe(`when querying and the where OR argument aims to fetch FiatTransfers with 'type: "deposit"' or 'type: "withdraw"'`, () => {
				it('should return all FiatTransfers with that combination', async () => {
					const graphQlquery = {
						operationName: 'Query',
						query,
						variables: {
							findAllFiatTransfersInput: {
								where: {
									OR: [
										{ type: 'withdraw' },
										{ type: 'deposit' },
									],
								},
							},
						},
					};

					const response = await request(app.getHttpServer())
						.post('/graphql')
						.send(graphQlquery);

					const fiatTransfers =
						response.body.data.findAllFiatTransfers;

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(fiatTransfers.length).toBe(22);

					fiatTransfers.forEach((fiatTransfer) => {
						expect(fiatTransfer).toEqual(
							expectedFiatTransferObject,
						);
					});
				});
			});
		});

		describe('pagination', () => {
			describe('when querying and the skip and take arguments are used to implement pagination', () => {
				describe('and the skip param is 1, and the take param is 2', () => {
					it('should return the first 2 FiatTransfers', async () => {
						const skip = 1;
						const take = 2;
						const graphQlquery = {
							operationName: 'Query',
							query,
							variables: {
								findAllFiatTransfersInput: {
									skip,
									take,
								},
							},
						};
						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(graphQlquery);

						const fiatTransfers =
							response.body.data.findAllFiatTransfers;

						expect(response.statusCode).toEqual(HttpStatus.OK);
						expect(fiatTransfers).toHaveLength(take);

						fiatTransfers.forEach((exchange) => {
							expect(exchange).toEqual(
								expectedFiatTransferObject,
							);
						});

						const lastFiatTransfer =
							fiatTransfers[fiatTransfers.length - 1];
						const lastFiatTransferId = skip + take;
						expect(lastFiatTransfer.id).toEqual(lastFiatTransferId);
					});
				});
			});

			describe('when querying and the cursor and take arguments are used to implement pagination', () => {
				describe('and the cursor param is {"id":1}, and the take param is 2', () => {
					it('should return the first 2 FiatTransfers', async () => {
						const cursor = { id: 1 };
						const take = 2;
						const graphQlquery = {
							operationName: 'Query',
							query,
							variables: {
								findAllFiatTransfersInput: {
									cursor,
									take,
								},
							},
						};

						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(graphQlquery);

						const fiatTransfers =
							response.body.data.findAllFiatTransfers;

						expect(response.statusCode).toEqual(HttpStatus.OK);
						expect(fiatTransfers).toHaveLength(take);

						fiatTransfers.forEach((fiatTransfer) => {
							expect(fiatTransfer).toEqual(
								expectedFiatTransferObject,
							);
						});

						const lastFiatTransfer =
							fiatTransfers[fiatTransfers.length - 1];
						const lastFiatTransferId = cursor.id + take - 1;
						expect(lastFiatTransfer.id).toEqual(lastFiatTransferId);
					});
				});
			});
		});
	});
};

export default runFindAllTests;
