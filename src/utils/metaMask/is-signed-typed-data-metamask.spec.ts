import generateWallet from '../generate-wallet';
import signTypedDataMetaMask from './sign-typed-data-metamask';
import isSignedTypedDataMetaMask from './is-signed-typed-data-metamask';

describe('isSignedTypedDataMetaMask', () => {
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
		describe('and the data is an object', () => {
			it('should return true', () => {
				const { address, privateKey } = generateWallet(); // generate Spy

				const signature = signTypedDataMetaMask({
					data,
					privateKey,
				}); // generate Spy

				const isSignedTypedData = isSignedTypedDataMetaMask({
					data,
					address,
					signature,
				});

				expect(isSignedTypedData).toEqual(true);
			});
		});

		describe('and the data is a JSON string', () => {
			it('should return true', () => {
				const { address, privateKey } = generateWallet(); // generate Spy

				const signature = signTypedDataMetaMask({
					data: JSON.stringify(data),
					privateKey,
				}); // generate Spy

				const isSignedTypedData = isSignedTypedDataMetaMask({
					data: JSON.stringify(data),
					address,
					signature,
				});

				expect(isSignedTypedData).toEqual(true);
			});
		});
	});
});
