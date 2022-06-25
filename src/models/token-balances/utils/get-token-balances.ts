import getScamTokensMap from './get-scam-tokens-map';
import ITokenBalance from '../interfaces/token-balance-interface'
import getCovalentTokenBalances from '../../../services/covelant/get-covalent-token-balances';
import convertCovalentTokenBalancesToTokenBalances from './convert-covalent-token-balances-to-token-balances';

interface ITokenBalancesInput {
	address: string;
	currency: string;
	filter: string;
	chainId: string;
}

const getTokenBalances = async ({
	filter,
	address,
	chainId,
	currency = 'usd',
}: ITokenBalancesInput): Promise<ITokenBalance[]> => {
	const scamTokensMap = await getScamTokensMap();
	const covalentTokenBalances = await getCovalentTokenBalances({
		filter,
		address,
		chainId,
		currency,
	});

	const filteredTokenBalances = covalentTokenBalances.filter((tokenBalance) => {
		const { contract_address } = tokenBalance;
		const scamTokensMapEth = scamTokensMap[chainId];

		return !scamTokensMapEth[contract_address];
	});

	const tokenBalances = convertCovalentTokenBalancesToTokenBalances({
		tokenBalances: filteredTokenBalances,
	});

	return tokenBalances;
};

export default getTokenBalances;
