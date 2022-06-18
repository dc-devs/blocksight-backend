import request from 'supertest';
import UserProperty from '../users/enums/user-property.enum';
import { fourthUser, password } from '../../prisma/users.seed';
import { INestApplication, HttpStatus } from '@nestjs/common';
import initializeTestApp from '../helpers/init/initializeTestApp';
import ErrorMessage from '../../src/graphql/errors/error-message.enum';
import ExtensionCode from '../../src/graphql/errors/extension-code.enum';
import { redisClient } from '../../src/server/initialize/initialize-redis';
import responseContainsSetCookie from '../helpers/utils/response-contains-set-cookie';

enum SignInMetaMaskData {
	SIGNATURE = '0x94a68d760fc56af3524502d111142bda3cb2394b080d0c9c963a223613d8bdf1511c4eac9a7a4e7dc30d15facc5e30b7366ada0020fced12f3b17b71437d08bb1b',
	MESSAGE = '{"domain":{"chainId":1,"name":"BlockSight","verifyingContract":"0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC","version":"1"},"message":{"contents":"Hello from BlockSight!"},"primaryType":"Message","types":{"EIP712Domain":[{"name":"name","type":"string"},{"name":"version","type":"string"},{"name":"chainId","type":"uint256"},{"name":"verifyingContract","type":"address"}],"Message":[{"name":"contents","type":"string"}]}}',
}

describe('Auth', () => {
	let app: INestApplication;

	beforeAll(async () => {
		app = await initializeTestApp();
	});

	afterAll(async () => {
		await redisClient.disconnect();
		await app.close();
	});

	describe('SignIn MetaMask', () => {
		describe('and the user already exists', () => {
			describe('when signing in with a valid MetaMask signature', () => {
				let signInMetaMaskInput;
				let expectedUserResponse;
				const { email, role, primaryWalletAddress } = fourthUser;

				beforeEach(() => {
					signInMetaMaskInput = {
						address: primaryWalletAddress,
						signature: SignInMetaMaskData.SIGNATURE,
						message: SignInMetaMaskData.MESSAGE,
					};

					expectedUserResponse = expect.objectContaining({
						id: expect.any(Number),
						role,
						email,
						primaryWalletAddress,
						createdAt: expect.any(String),
						updatedAt: expect.any(String),
					});
				});

				it('should login the user', async () => {
					const query = {
						operationName: 'Mutation',
						query: `
							mutation Mutation($signInMetaMaskInput: SignInMetaMaskInput!) {
								signInMetaMask(signInMetaMaskInput: $signInMetaMaskInput) {
									user {
										id
										email
										primaryWalletAddress
										role
										createdAt
										updatedAt
									}
									isAuthenticated
								}
							}`,
						variables: {
							signInMetaMaskInput,
						},
					};
					const response = (await request(app.getHttpServer())
						.post('/graphql')
						.set('x-forwarded-proto', 'https')
						.send(query)) as any;

					const { signInMetaMask } = response.body.data;
					const { isAuthenticated } = signInMetaMask;
					const { user } = signInMetaMask;

					expect(response.statusCode).toEqual(HttpStatus.OK);
					expect(isAuthenticated).toEqual(true);
					expect(user).toEqual(expectedUserResponse);
					expect(user).not.toHaveProperty(UserProperty.PASSWORD);
					expect(responseContainsSetCookie(response)).toEqual(true);
				});
			});

			describe('validation', () => {
				describe('when sending no data', () => {
					let signInMetaMaskInput;

					beforeEach(() => {
						signInMetaMaskInput = {
							address: '',
							signature: '',
							message: '',
						};
					});

					it("should respond with 'Unauthorized'", async () => {
						const query = {
							operationName: 'Mutation',
							query: `
								mutation Mutation($signInMetaMaskInput: SignInMetaMaskInput!) {
									signInMetaMask(signInMetaMaskInput: $signInMetaMaskInput) {
										user {
											id
											email
											primaryWalletAddress
											role
											createdAt
											updatedAt
										}
										isAuthenticated
									}
							}`,
							variables: {
								signInMetaMaskInput,
							},
						};

						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(query);
						const errors = response.body.errors;
						const unauthorizedError = errors[0];

						expect(unauthorizedError.message).toEqual(
							ErrorMessage.UNAUTHORIZED,
						);
						expect(unauthorizedError.extensions.code).toEqual(
							ExtensionCode.UNAUTHENTICATED,
						);
						expect(
							unauthorizedError.extensions.response.statusCode,
						).toEqual(HttpStatus.UNAUTHORIZED);
					});
				});

				describe('when sending a valid address but invalid signature', () => {
					let signInMetaMaskInput;
					const { primaryWalletAddress } = fourthUser;

					beforeEach(() => {
						signInMetaMaskInput = {
							address: primaryWalletAddress,
							signature: SignInMetaMaskData.SIGNATURE + '1234',
							message: SignInMetaMaskData.MESSAGE,
						};
					});

					it("should respond with 'Unauthorized'", async () => {
						const query = {
							operationName: 'Mutation',
							query: `
								mutation Mutation($signInMetaMaskInput: SignInMetaMaskInput!) {
									signInMetaMask(signInMetaMaskInput: $signInMetaMaskInput) {
										user {
											id
											email
											primaryWalletAddress
											role
											createdAt
											updatedAt
										}
										isAuthenticated
									}
							}`,
							variables: {
								signInMetaMaskInput,
							},
						};
						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(query);
						const errors = response.body.errors;
						const unauthorizedError = errors[0];
						expect(unauthorizedError.message).toEqual(
							ErrorMessage.UNAUTHORIZED,
						);
						expect(unauthorizedError.extensions.code).toEqual(
							ExtensionCode.UNAUTHENTICATED,
						);
						expect(
							unauthorizedError.extensions.response.statusCode,
						).toEqual(HttpStatus.UNAUTHORIZED);
					});
				});

				describe('when sending a valid address but invalid message', () => {
					let signInMetaMaskInput;
					const { primaryWalletAddress } = fourthUser;

					beforeEach(() => {
						signInMetaMaskInput = {
							address: primaryWalletAddress,
							signature: SignInMetaMaskData.SIGNATURE,
							message: SignInMetaMaskData.MESSAGE + '1234',
						};
					});

					it("should respond with 'Unauthorized'", async () => {
						const query = {
							operationName: 'Mutation',
							query: `
								mutation Mutation($signInMetaMaskInput: SignInMetaMaskInput!) {
									signInMetaMask(signInMetaMaskInput: $signInMetaMaskInput) {
										user {
											id
											email
											primaryWalletAddress
											role
											createdAt
											updatedAt
										}
										isAuthenticated
									}
							}`,
							variables: {
								signInMetaMaskInput,
							},
						};
						const response = await request(app.getHttpServer())
							.post('/graphql')
							.send(query);
						const errors = response.body.errors;
						const unauthorizedError = errors[0];
						expect(unauthorizedError.message).toEqual(
							ErrorMessage.UNAUTHORIZED,
						);
						expect(unauthorizedError.extensions.code).toEqual(
							ExtensionCode.UNAUTHENTICATED,
						);
						expect(
							unauthorizedError.extensions.response.statusCode,
						).toEqual(HttpStatus.UNAUTHORIZED);
					});
				});
			});
		});
	});
});
