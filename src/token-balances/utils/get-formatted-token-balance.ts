import { BigNumber } from 'bignumber.js';

const format = {
	prefix: '',
	decimalSeparator: '.',
	groupSeparator: ',',
	groupSize: 3,
	secondaryGroupSize: 0,
	fractionGroupSeparator: ' ',
	fractionGroupSize: 0,
	suffix: '',
};

interface Props {
	balance: string;
	contractDecimals: number;
}

const getFormattedTokenBalances = ({ balance, contractDecimals }: Props) => {
	BigNumber.config({ FORMAT: format });

	const balanceBN = new BigNumber(balance);
	const TokenBalancesAmount = balanceBN
		.shiftedBy(-contractDecimals)
		.toFormat(8);

	return TokenBalancesAmount.toString();
};

export default getFormattedTokenBalances;
