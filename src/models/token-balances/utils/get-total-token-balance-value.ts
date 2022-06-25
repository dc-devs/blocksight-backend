import BigNumber from 'bignumber.js';
import ITokenBalance from '../interfaces/token-balance-interface';

interface Props {
	tokenBalances: ITokenBalance[];
}

const getTotalBalanceValue = ({ tokenBalances }: Props) => {
	let totalTokenBalanceValue = new BigNumber(0);

	if (tokenBalances.length > 0) {
		tokenBalances.forEach((tokenBalance) => {
			const { totalValue } = tokenBalance;
			const { value } = totalValue;

			totalTokenBalanceValue = totalTokenBalanceValue.plus(value);
		});
	}

	return totalTokenBalanceValue;
};

export default getTotalBalanceValue;
