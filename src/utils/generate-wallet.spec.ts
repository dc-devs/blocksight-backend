import generateWallet from './generate-wallet';

describe('generateWallet', () => {
	describe('when executed', () => {
		it('should return a newly generated wallet', () => {
			const { address, privateKey } = generateWallet();

			expect(address).toEqual(expect.any(String));
			expect(privateKey).toEqual(expect.any(String));
		});
	});
});
