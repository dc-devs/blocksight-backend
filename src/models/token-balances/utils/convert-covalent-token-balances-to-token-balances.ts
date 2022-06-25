import TokenDisplayData from '../interfaces/token-balance-interface';
import CovalentTokenBalance from '../../../interfaces/covalent-token-balance-interface';
import convertCovalentTokenBalanceToTokenBalance from './convert-covalent-token-balacne-to-token-balance';

interface ITokenBalances {
	tokenBalances: CovalentTokenBalance[];
}

const convertCovalentTokenBalancesToTokenBalances = ({
	tokenBalances,
}: ITokenBalances): TokenDisplayData[] => {
	return tokenBalances.map((tokenBalances) => {
		return convertCovalentTokenBalanceToTokenBalance(tokenBalances);
	});
};

export default convertCovalentTokenBalancesToTokenBalances;
