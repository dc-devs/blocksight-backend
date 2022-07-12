import request from 'supertest';
import { UserRole } from '@prisma/client';
import { INestApplication, HttpStatus } from '@nestjs/common';
import UserProperty from '../../users/enums/user-property.enum';
import generateWallet from '../../../../src/utils/generate-wallet';
import initializeTestApp from '../../../helpers/init/initializeTestApp';
import ErrorMessage from '../../../../src/graphql/errors/error-message.enum';
import SignInMetaMaskData from '../../../helpers/enums/sign-in-metamask-data';
import ExtensionCode from '../../../../src/graphql/errors/extension-code.enum';
import { redisClient } from '../../../../src/server/initialize/initialize-redis';
import {
	fourthUser,
	fourthUserWallet,
} from '../../../../prisma/seeds/users.seed';
import signTypedDataMetaMask from '../../../../src/utils/metaMask/sign-typed-data-metamask';
import responseContainsSetCookie from '../../../helpers/utils/response-contains-set-cookie';

const runSignInMetaMaskTests = () => {
	describe('SignIn MetaMask', () => {
		let app: INestApplication;

		beforeAll(async () => {
			app = await initializeTestApp();
		});

		afterAll(async () => {
			await redisClient.disconnect();
			await app.close();
		});

		describe('and the user already exists', () => {
			describe('when signing in with a valid MetaMask signature', () => {
				let signInMetaMaskInput;
				let expectedUserResponse;

				beforeEach(() => {
					const { privateKey } = fourthUserWallet;
					const { email, role, primaryWalletAddress } = fourthUser;

					signInMetaMaskInput = {
						address: primaryWalletAddress,
						signature: signTypedDataMetaMask({
							privateKey,
							data: SignInMetaMaskData.MESSAGE,
						}),
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
		});

		describe('and the user does not already exists', () => {
			describe('when signing in with a valid MetaMask signature', () => {
				let signInMetaMaskInput;
				let expectedUserResponse;
				const { address, privateKey } = generateWallet();
				const signature = signTypedDataMetaMask({
					privateKey,
					data: SignInMetaMaskData.MESSAGE,
				});

				beforeEach(() => {
					signInMetaMaskInput = {
						address,
						signature,
						message: SignInMetaMaskData.MESSAGE,
					};

					expectedUserResponse = expect.objectContaining({
						id: expect.any(Number),
						role: UserRole.USER,
						email: null,
						primaryWalletAddress: address,
						createdAt: expect.any(String),
						updatedAt: expect.any(String),
					});
				});

				it('should create and login the new user', async () => {
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

				beforeEach(() => {
					const { privateKey } = fourthUserWallet;
					const { primaryWalletAddress } = fourthUser;
					const signature = signTypedDataMetaMask({
						privateKey,
						data: SignInMetaMaskData.MESSAGE,
					});

					signInMetaMaskInput = {
						address: primaryWalletAddress,
						signature: `${signature}-1234`,
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

				beforeEach(() => {
					const { privateKey } = fourthUserWallet;
					const { primaryWalletAddress } = fourthUser;
					const signature = signTypedDataMetaMask({
						privateKey,
						data: SignInMetaMaskData.MESSAGE,
					});

					signInMetaMaskInput = {
						signature,
						address: primaryWalletAddress,
						message: `${SignInMetaMaskData.MESSAGE}-1234`,
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
};

export default runSignInMetaMaskTests;
