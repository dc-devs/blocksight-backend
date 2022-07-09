import TokenDisplayData from '../interfaces/token-balance-interface';
import CovalentTokenBalance from '../../../interfaces/covalent-token-balance-interface';
import convertCovalentTokenBalanceToTokenBalance from './convert-covalent-token-balacne-to-token-balance';

interface IProps {
	chainId: string;
	tokenBalances: CovalentTokenBalance[];
}

const convertCovalentTokenBalancesToTokenBalances = ({
	chainId,
	tokenBalances,
}: IProps): TokenDisplayData[] => {
	return tokenBalances.map((tokenBalance) => {
		return convertCovalentTokenBalanceToTokenBalance({
			chainId,
			tokenBalance,
		});
	});
};

export default convertCovalentTokenBalancesToTokenBalances;
