import ITokenBalance from '../interfaces/token-balance-interface';
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
	const covalentTokenBalances = await getCovalentTokenBalances({
		filter,
		address,
		chainId,
		currency,
	});

	const tokenBalances = convertCovalentTokenBalancesToTokenBalances({
		chainId,
		tokenBalances: covalentTokenBalances,
	});

	return tokenBalances;
};

export default getTokenBalances;
