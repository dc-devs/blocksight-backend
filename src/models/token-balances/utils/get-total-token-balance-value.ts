import BigNumber from 'bignumber.js';
import formatBnToFiat from '../../../utils/format-bn-to-fiat';
import ITotalValue from '../interfaces/total-value-interface';
import ITokenBalance from '../interfaces/token-balance-interface';

interface Props {
	currency: string;
	tokenBalances: ITokenBalance[];
}

const getTotalBalanceValue = ({
	currency,
	tokenBalances,
}: Props): ITotalValue => {
	let totalTokenBalanceValue = new BigNumber(0);

	tokenBalances.forEach((tokenBalance) => {
		const { totalValue } = tokenBalance;
		const { value } = totalValue;

		totalTokenBalanceValue = totalTokenBalanceValue.plus(value);
	});

	const totalValueString = totalTokenBalanceValue.toString();

	const formattedTotalValue = formatBnToFiat({
		currency,
		format: '0,0.00',
		bigNumber: totalTokenBalanceValue,
	});

	return {
		value: totalValueString,
		formatted: formattedTotalValue,
	};
};

export default getTotalBalanceValue;
