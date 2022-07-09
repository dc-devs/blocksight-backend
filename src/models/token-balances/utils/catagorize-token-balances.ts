import getScamTokens from './get-scam-tokens';
import shouldHideToken from './should-hide-token';
import ITokenBalance from '../interfaces/token-balance-interface';

const catagorizeTokenBalances = async (tokenBalances: ITokenBalance[]) => {
	const nftBalances: ITokenBalance[] = [];
	const scamTokenBalances: ITokenBalance[] = [];
	const hiddenTokenBalances: ITokenBalance[] = [];
	const displayTokenBalances: ITokenBalance[] = [];
	const scamTokens = await getScamTokens();

	tokenBalances.forEach((tokenBalance) => {
		const { contractAddress, balance, price, chainId, isNft } =
			tokenBalance;
		const scamTokensAddresses = scamTokens[chainId];
		const isScamToken = scamTokensAddresses[contractAddress];
		const isHiddenToken = shouldHideToken({ balance, price: price.value });

		if (isScamToken) {
			scamTokenBalances.push(tokenBalance);
		} else if (isNft) {
			nftBalances.push(tokenBalance);
		} else if (isHiddenToken) {
			hiddenTokenBalances.push(tokenBalance);
		} else {
			displayTokenBalances.push(tokenBalance);
		}
	});

	return {
		nftBalances,
		scamTokenBalances,
		hiddenTokenBalances,
		displayTokenBalances,
	};
};

export default catagorizeTokenBalances;
