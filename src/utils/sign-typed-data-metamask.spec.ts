import generateWallet from './generate-wallet';
import signTypedDataMetaMask from './sign-typed-data-metamask';

describe('signTypedDataMetaMask', () => {
	const data = {
		domain: {
			chainId: 1,
			name: 'Test Domain',
			version: '1',
		},
		message: {
			contents: 'Test Message',
		},
		primaryType: 'Message',
		types: {
			EIP712Domain: [
				{
					name: 'name',
					type: 'string',
				},
				{
					name: 'version',
					type: 'string',
				},
				{
					name: 'chainId',
					type: 'uint256',
				},
			],
			Message: [
				{
					name: 'contents',
					type: 'string',
				},
			],
		},
	};

	describe('when executed', () => {
		describe('and the data and private keys are strings', () => {
			it('should return signed data', () => {
				const { privateKey } = generateWallet(); // generate Spy

				const signedData = signTypedDataMetaMask({
					data: JSON.stringify(data),
					privateKey,
				});

				expect(signedData).toEqual(expect.any(String));
			});
		});

		describe('and the data is an object, and privateKey is a buffer', () => {
			it('should return signed data', () => {
				const { privateKey } = generateWallet(); // generate Spy
				const privateKeyBuffer = Buffer.from(
					privateKey.substring(2, 66),
					'hex',
				);

				const signedData = signTypedDataMetaMask({
					data,
					privateKey: privateKeyBuffer,
				});

				expect(signedData).toEqual(expect.any(String));
			});
		});
	});
});
